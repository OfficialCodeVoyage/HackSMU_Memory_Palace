import openai
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from together import Together
import base64
import json
import os
import logging
from io import BytesIO
from PIL import Image
import dotenv
from datetime import datetime
import math

# logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)

dotenv.load_dotenv()
openai.api_key = #get your own)
together_client = Together(api_key="#")

app = Flask(__name__)
CORS(app)

system_message = {"role": "system", "content": "You are an intelligent assistant."}

@app.route('/api', methods=["GET", "POST"])
def categorize_and_generate_images():
    if request.method == "POST":
        try:
            #get words from the request
            words = request.json.get("words")
            if not words:
                return jsonify({"error": "No words provided."}), 400


            message = f"""
            Please cluster the words into categories. Assign a name to each category.
            Your response should be formatted as a JSON array, where each item represents a category.
            For each category, include the included words as attributes.
            It's crucial that the response only contains the JSON array with the specified attributes and no additional text.
            Example format:
            [
                {{
                    "category1": ["word1", "word4"],
                    "category2": ["word2", "word3"]
                }}
            ]
            Here is the text:
            {words}
            """

            categorize_message = {
                "role": "user",
                "content": message
            }

            # categorization
            messages = [system_message, categorize_message]
            chat = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            reply = chat['choices'][0]['message']['content']

            reply_data = json.loads(reply)


            categories_list = []
            for category_dict in reply_data:
                for category_name, words_list in category_dict.items():
                    categories_list.append({
                        "category": category_name,
                        "words": words_list
                    })


            num_categories = len(categories_list)
            if num_categories == 0:
                return jsonify({"error": "No categories found after clustering."}), 400


            images_per_category = math.ceil(8 / num_categories)


            for category in categories_list:
                category_name = category['category']
                original_words = category['words']
                num_additional_words_needed = images_per_category - len(original_words)
                num_additional_words_needed = max(0, num_additional_words_needed)

                if num_additional_words_needed > 0:
                    generate_additions_message = {
                        "role": "user",
                        "content": f"""
                        For the category "{category_name}", generate {num_additional_words_needed} new words that fit the category.
                        Do not include provided words. Response format:
                        {{
                            "category": "{category_name}",
                            "words": ["newword1", "newword2", ...]
                        }}
                        """
                    }
                    messages = [system_message, generate_additions_message]
                    chat_additions = openai.ChatCompletion.create(
                        model="gpt-3.5-turbo",
                        messages=messages
                    )
                    additions = chat_additions['choices'][0]['message']['content']
                    additions_data = json.loads(additions)

                    additional_words = additions_data.get('words', [])
                    category['all_words'] = original_words + additional_words
                else:
                    category['all_words'] = original_words


                category['all_words'] = category['all_words'][:images_per_category]

            #Generateimages
            categories_images = category_images(categories_list)

            #Collect all images
            total_images = sum(len(cat['images']) for cat in categories_images.values())


            if total_images > 8:
                images_to_remove = total_images - 8
                for category in categories_images.values():
                    while images_to_remove > 0 and category['images']:
                        removed_word = next(iter(category['images']))
                        del category['images'][removed_word]
                        images_to_remove -= 1


            response_data = []
            for category in categories_images:
                response_data.append({
                    "category": category,
                    "words": categories_images[category].get("words", []),
                    "images": categories_images[category].get("images", {})
                })

            return jsonify({"categories": response_data})

        except json.JSONDecodeError:
            logging.error("Failed to parse JSON response from OpenAI.")
            return jsonify({"error": "Failed to parse JSON response from OpenAI."}), 500
        except Exception as e:
            logging.error(f"Error in categorize_and_generate_images: {e}")
            return jsonify({"error": str(e)}), 500

    return "Send a POST request with 'words' as a JSON array."

def category_images(categories_data):
    categories = {}

    for item in categories_data:
        category = item.get("category")
        words = item.get("all_words", [])
        categories[category] = {"words": words, "images": {}}

        for word in words:
            prompt = f"Minimal background, centered {word} with high resolution and detailed close-up."

            try:
                # Together API to generate image
                response = together_client.images.generate(
                    prompt=prompt,
                    model="black-forest-labs/FLUX.1-schnell",
                    steps=10,
                    n=1,
                    height=512,
                    width=512
                )

                logging.debug(f"Together API response for word '{word}': {response}")

                if not response or not hasattr(response, 'data') or not response.data:
                    raise ValueError(f"Invalid response from Together API for word: {word}. Response: {response}")

                image_choice = response.data[0]
                image_url = image_choice.url
                b64_json = image_choice.b64_json

                if image_url:
                    categories[category]["images"][word] = image_url
                elif b64_json:
                    # Save image to disk
                    image_data = base64.b64decode(b64_json)
                    image = Image.open(BytesIO(image_data))
                    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
                    image_file = f"images/{word}_{timestamp}.png"
                    os.makedirs("images", exist_ok=True)
                    image.save(image_file)
                    categories[category]["images"][word] = f"/images/{word}_{timestamp}.png"
                else:
                    raise ValueError(f"Missing image data in Together API response for word: {word}")

            except Exception as e:
                logging.error(f"Error generating image for {word}: {e}")
                categories[category]["images"][word] = None

    return categories

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory('images', filename)

if __name__ == '__main__':
    app.run(debug=False)
