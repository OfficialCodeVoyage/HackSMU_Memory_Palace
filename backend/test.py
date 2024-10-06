import os
from together import Together
import base64
from PIL import Image
from io import BytesIO
import requests

# Initialize Together client with hardcoded API key
client = Together(api_key="#")

# Generate images using Together API
response = client.images.generate(
    prompt="cat on the moon",
    model="black-forest-labs/FLUX.1-schnell",
    steps=10,
    n=4
)

# Iterate through each generated image
for idx, image_data in enumerate(response.data):
    if image_data.b64_json:
        # If b64_json is available, decode and display the image
        try:
            decoded_image = base64.b64decode(image_data.b64_json)
            image = Image.open(BytesIO(decoded_image))
            image.show(title=f"Image {idx + 1}")
        except Exception as e:
            print(f"Error decoding image {idx + 1}: {e}")
    elif image_data.url:
        # If URL is provided, download and display the image
        try:
            img_response = requests.get(image_data.url)
            if img_response.status_code == 200:
                image = Image.open(BytesIO(img_response.content))
                image.show(title=f"Image {idx + 1}")
            else:
                print(f"Failed to download image {idx + 1} from URL: {image_data.url}")
        except Exception as e:
            print(f"Error downloading image {idx + 1}: {e}")
    else:
        print(f"No image data available for image {idx + 1}.")
