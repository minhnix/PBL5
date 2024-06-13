from flask import Flask, request, Response, json, send_file
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import os
import cv2
import numpy as np
from service.BeService import BeService
from threading import Thread
import time

from service.DetectService import DetectService
from service.ImageService import ImageService
detect_model = DetectService()
# import multi_vid as mv

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
            pil_image = np.array(image1)
            original_image = cv2.cvtColor(pil_image, cv2.COLOR_RGB2BGR)
            result = detect_model(original_image)
            draw_image = ImageService.label(original_image, result, image.filename)
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

def webcam():
    camera = cv2.VideoCapture(0)

    while True:
        success, frame = camera.read()
        if success:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            camera.release()


@app.route('/video')
def webcam_display():
    return Response(webcam(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/webhook", methods=["POST", "GET"])
def update():
    print("Update")
    return "Vehicle list updated", 200


if __name__ == '__main__':

    # detection_thread = Thread(target=detect_car)
    # detection_thread.daemon = True
    # detection_thread.start()


    app.run(debug=True, port=5000)
