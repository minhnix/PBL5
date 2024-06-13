import cv2
import threading
import queue
import time
from flask import Flask, Response

app = Flask(__name__)
frame_queue = queue.Queue()

def read_frames():
    camera = cv2.VideoCapture(0)
    while True:
        success, frame = camera.read()
        if success:
            frame_queue.put(frame)
        else:
            print("Không thể đọc frame")
        # Delay nhỏ để tránh sử dụng CPU quá nhiều
        time.sleep(0.1)

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