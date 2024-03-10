from flask import Flask, request, Response, json, send_file
from PIL import Image
from io import BytesIO
import os

from service.detect import Detect
model = Detect()

app = Flask(__name__)

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
        if 'file' not in request.files:
            return 'No file provided', 400

        file = request.files['file']
        if file.filename == '':
            return 'No selected file', 400
        file_path = 'images/' + file.filename
        file.save(file_path)

        result = model(file_path)
        return Response(json.dumps(result), status=200, mimetype='application/json')
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
