from flask import Flask, request, Response, json, send_file
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import os

from service.DetectService import DetectService
from service.ImageService import ImageService
detect_model = DetectService()

app = Flask(__name__)
CORS(app)

def get_image_from_request():
    if "file" not in request.files:
        return None, Response(
            json.dumps({"error": "Invalid request data"}),
            status=400,
            mimetype='application/json'
        )
    return request.files["file"], None


@app.route("/detect", methods=["POST"])
def detect_():
    try:
        if 'images' not in request.files:
            return 'No file provided', 400

        images = request.files.getlist('images')
        response = []

        for image in images:
            image1 = Image.open(BytesIO(image.read()))
            result = detect_model(image1)
            draw_image = ImageService.label(image1, result, image.filename)
            response.append(result)

        return Response(json.dumps(response), status=200, mimetype='application/json')
    except Exception as e:
        return Response(
            json.dumps(str(e)),
            status=500,
            mimetype='application/json'
        )

@app.route("/test", methods=["GET"])
def test():
    return "OKE", 200

@app.route("/images/<image_name>", methods=["GET"])
def get_image(image_name):
    image_path = os.path.join('images/', image_name)
    if os.path.exists(image_path):
        return send_file(image_path, mimetype='image/jpeg')
    else:
        return 'Image not found', 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
