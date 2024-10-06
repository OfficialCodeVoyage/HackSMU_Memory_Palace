import openai
from flask import Flask, request, jsonify, send_from_directory
from together import Together
import base64
import json
import os
import logging
from io import BytesIO
from PIL import Image
import dotenv

# logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)


os.environ.pop('OPENAI_API_KEY', None)
os.environ.pop('TOGETHER_API_KEY', None)
dotenv.load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
together_client = Together(api_key="os.getenv('TOGETHER_API_KEY')")


app = Flask(__name__)


system_message = {"role": "system", "content": "You are an intelligent assistant."}

@app.route('/api', methods=["GET", "POST"])
def categorize_and_generate_images():
    if request.method == "POST":
        try:
            # list of words from the request
            words = request.json.get("words")
            if not words:
                return jsonify({"error": "No words provided."}), 400

            # categorization
            categorize_message = {
                "role": "user",
                "content": f"""
                Please cluster the words into categories. Assign a name to each category.
                Response format:
                [
                    {{
                        "category": "CategoryName",
                        "words": ["word1", "word2"]
                    }},
                    ...
                ]
                Here are the words: {words}
                """
            }

            # Send the request to categorization
            messages = [system_message, categorize_message]
            chat = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            reply = chat['choices'][0]['message']['content']

            reply_data = json.loads(reply)

            generate_additions_message = {
                "role": "user",
                "content": f"""
                For each category, generate two new words that fit the category.
                Do not include provided words. Response format:
                [
                    {{
                        "category": "CategoryName",
                        "words": ["newword1", "newword2"]
                    }},
                    ...
                ]
                Here are the categories: {reply}
                """
            }
            messages = [system_message, generate_additions_message]
            chat_additions = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            additions = chat_additions['choices'][0]['message']['content']

            # cconvert response to JSON
            additions_data = json.loads(additions)

            # generate images
            categories_reply = category_images(reply_data)
            categories_additions = category_images(additions_data)


            response_data = []
            for category in categories_reply:
                response_data.append({
                    "category": category,
                    "original_words": categories_reply[category].get("words", []),
                    "additional_words": categories_additions.get(category, {}).get("words", []),
                    "images": categories_reply[category].get("images", {})
                })

            return jsonify({"categories": response_data})

        except json.JSONDecodeError:
            logging.error("Failed to parse JSON response from OpenAI.")
            return jsonify({"error": "Failed to parse JSON response from OpenAI."}), 500
        except Exception as e:
            logging.error(f"Error in categorize_and_generate_images: {e}")
            return jsonify({"error": str(e)}), 500


    return "Send a POST request with 'words' as a JSON array."

def category_images(data):
    categories = {}

    for item in data:
        category = item.get("category")
        words = item.get("words", [])
        categories[category] = {"words": words, "images": {}}

        for word in words:
            prompt = f"Minimal background, centered {word} with high resolution and detailed close-up."

            try:
                #Together API
                response = together_client.images.generate(
                    prompt=prompt,
                    model="black-forest-labs/FLUX.1-schnell",
                    steps=10,
                    n=1,
                    height=1024,
                    width=1024
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
                    image_data = base64.b64decode(b64_json)
                    image = Image.open(BytesIO(image_data))
                    image_file = f"images/{word}.png"
                    os.makedirs("images", exist_ok=True)
                    image.save(image_file)
                    categories[category]["images"][word] = f"/images/{word}.png"
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
