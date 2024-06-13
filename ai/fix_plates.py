import cv2
import threading
import queue
import time
from flask import Flask, Response
from service.BeService import BeService
import threading

be = BeService(base_api="http://localhost:3000/api")

app = Flask(__name__)
lock = threading.Lock()

plates = queue.Queue()
frame_queue = queue.Queue()

def read_frames():
    camera = cv2.VideoCapture(0)
    while True:
        print(plates.queue)
        if ("30A-56789" in plates.queue):
            print("True")
        success, frame = camera.read()
        if success:
            frame_queue.put(frame)
        else:
            print("Không thể đọc frame")
        # Delay nhỏ để tránh sử dụng CPU quá nhiều
        time.sleep(0.1)

@app.route("/webhook", methods=["POST","GET"])
def update():
    vehicles = be.getAllVehicle()
    with lock:
            plates.queue.clear()
    for v in vehicles:
        plates.put(v['numberPlate'])
        if '-' in v['numberPlate']:
                plates.put(v['numberPlate'].replace('-', ''))
    print("CC",plates.queue)
    return "Update success", 200


@app.route('/video')
def webcam_display():
    def generate_frames():
        while True:
            try:
                frame = frame_queue.get(timeout=1)
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + cv2.imencode('.jpg', frame)[1].tobytes() + b'\r\n')
            except queue.Empty:
                continue
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    # Tạo luồng đọc frame từ camera
    read_frames_thread = threading.Thread(target=read_frames)
    read_frames_thread.daemon = True
    read_frames_thread.start()

    # Chạy ứng dụng Flask
    app.run()