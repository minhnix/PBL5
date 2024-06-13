from flask import Flask, request, Response, json, send_file
import cv2
import queue
import threading
import time
from ultralytics import YOLO
import cv2
from PIL import Image
from service.DetectService import DetectService
from service.ImageService import ImageService
from service.BeService import BeService
from plates import Plates
import os
import time
import socket
import requests

from common import cache

app = Flask(__name__)
cache.init_app(app=app, config={'CACHE_TYPE': 'simple'})

ipCC = "192.168.32.217"
# Global variables
plates = set()
car = False
car_lock_time = 0
is_open_door = False
lock = threading.Lock()
frame_queue = queue.Queue()
video_queue = queue.Queue()
be = BeService(base_api="http://localhost:3000/api")
host = "192.168.34.189"
port = 5006

ipServo = "http://192.168.34.0"
url = ipServo + '/cc'

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((host, port))
print("Connected to ESP32")

vehicles = be.getAllVehicle()
for v in vehicles:
    plates.add(v['numberPlate'])
    if '-' in v['numberPlate']:
        plates.add(v['numberPlate'].replace('-', ''))

cache.set('plates', plates)


def read_frames(vid, frame_queue):
    global video_queue
    count = 0
    global car
    while True:
        try:
            count += 1
            success, frame = vid.read()
            if success:
                video_queue.put(frame)
                if (count % 5 == 0) and car:
                    frame_queue.put(frame)
            else:
                break
        except Exception as e:
            print("Error:", e)
            time.sleep(5)
            continue

def read_socket(sock, plates):
    global car, car_lock_time
    while True:
        try:
            data = sock.recv(1024).decode("utf-8")
            print("Received data:", data)
            current_time = time.time()
            
            if "Có xe tới" in data and not car and (current_time - car_lock_time >= 15) and not is_open_door:
                with lock:
                    car = True
                    car_lock_time = current_time
                
                vehicles = be.getAllVehicle()
                a_plates = set()
                for v in vehicles:
                    a_plates.add(v['numberPlate'])
                    if '-' in v['numberPlate']:
                        a_plates.add(v['numberPlate'].replace('-', ''))

                plates = a_plates

                    # time.sleep(5)
            # if is_open_door and (current_time - car_lock_time >= 15):
            #     data = {
            #         'degrees': 0
            #     }
            #     try:
            #         requests.post(url, data=data)
            #         print(f"Gửi xuống socket thành công")
            #     except Exception as e:
            #         print("Error:", e)

        except Exception as e:
            print("Error:", e)
            time.sleep(5)
            continue

def process_frames(frame_queue, plates):
    prev_frame_time = 0
    new_frame_time = 0
    detect_model = DetectService()

    def sendHistory(frame, plate):
        _, img_encoded = cv2.imencode('.jpg', frame)
        img_bytes = img_encoded.tobytes()
        be.postHistory(file=img_bytes, data={'numberPlate': plate, 'typeStatus': 'out'})
        print("Đã gửi lên server")
        # plate = "PLATE_" + plate
        # sock.sendall(plate.encode("utf-8"))
        # print("Gửi xuống socket thành công")
        # global is_open_door
        # is_open_door = True
        data = {
            'degrees2': 90
        }        
        try:
            requests.post(url, data=data)
            print(f"Gửi xuống socket thành công")
        except Exception as e:
            print("Error:", e)

    global car
    while True:
        if not frame_queue.empty():
            frame = frame_queue.get()
            if car:
                results = detect_model(frame)
                for result in results:
                    cv2.rectangle(frame, (int(result['coordinates'][0]), int(result['coordinates'][1])),
                                  (int(result['coordinates'][2]), int(result['coordinates'][3])), color=(0, 0, 225), thickness=2)
                    cv2.putText(frame, result['number_license_plate'], (int(result['coordinates'][0]), int(result['coordinates'][1]-10)),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)


                    if result['number_license_plate'] in plates:
                        http_thread = threading.Thread(target=sendHistory, args=(frame, result['number_license_plate']))
                        http_thread.start()
                        with lock:
                            car = False
                        break

            new_frame_time = time.time()
            fps = 1/(new_frame_time-prev_frame_time)
            prev_frame_time = new_frame_time
            fps = int(fps)
            cv2.putText(frame, str(fps), (7, 70), cv2.FONT_HERSHEY_SIMPLEX, 3, (100, 255, 0), 3, cv2.LINE_AA)
            cv2.imshow('frame', frame)
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
        else:
            time.sleep(0.01)

@app.route("/webhook", methods=["POST","GET"])
def update():
    Plates.plate()
    cache.set('plates',Plates.get())
    return "Vehicle list updated", 200

# def webcam():
#     while True:
#         if not video_queue.empty():
#             frame = video_queue.get()
#             ret, buffer = cv2.imencode('.jpg', frame)
#             frame = buffer.tobytes()
#             print(frame)
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
#         else:
#             time.sleep(0.01)

@app.route('/video')
def webcam_display():
    def webcam():
        global video_queue
        while True:
            if not video_queue.empty():
                frame = video_queue.get()
                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                print(frame)
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                time.sleep(0.01)

    return Response(webcam(), mimetype='multipart/x-mixed-replace; boundary=frame')




def start_detection():
    esp32_cam_ip = host + ":81"
    video_url = f"http://{esp32_cam_ip}/stream"
    vid = cv2.VideoCapture(video_url)
    if not vid.isOpened():
        raise Exception("Không thể mở video từ ESP32-CAM")

    thread1 = threading.Thread(target=read_frames, args=(vid, frame_queue))
    thread2 = threading.Thread(target=process_frames, args=(frame_queue,plates))
    thread3 = threading.Thread(target=read_socket, args=(sock,plates))
    thread1.start()
    thread2.start()
    thread3.start()
    thread1.join()
    thread2.join()
    thread3.join()
    print("Các luồng đã kết thúc.")

if __name__ == '__main__':
    detection_thread = threading.Thread(target=start_detection)
    detection_thread.daemon = True
    detection_thread.start()
    app.run(debug=True, port=5001)
