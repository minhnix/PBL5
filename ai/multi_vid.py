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
import os
import time
import socket


def read_frames(vid, queue):
    count = 0
    global car
    while True:
        try:
            count += 1
            success, frame = vid.read()
            if success:
                if (count % 5 == 0):
                        if (car == True):
                            queue.put(frame)
            else:
                break
        except Exception as e:
            print("Error:", e)
            time.sleep(5)
            continue

def read_socket(sock):
    global car
    while True:
        try:
            data = sock.recv(1024).decode("utf-8")
            print("Received data:", data)
            
            if "Có xe tới" in data and car == False:
                with lock:
                    car = True

            elif "Hết xe" in data and car == True:
                with lock:
                    car = False

        except Exception as e:
            print("Error:", e)
            time.sleep(5)
            continue


car = False

def process_frames(queue):
    prev_frame_time = 0
    new_frame_time = 0
    detect_model = DetectService() 

    global car
    
    def sendHistory(frame, plate):
        _, img_encoded = cv2.imencode('.jpg', frame)
        img_bytes = img_encoded.tobytes()
        be.postHistory(file=img_bytes, data={'numberPlate': plate, 'typeStatus': 'in'})
        print("Đã gửi lên server")
        plate = "PLATE_" + plate
        sock.sendall(plate.encode("utf-8"))
        print("Gửi xuống socket thành công")

    vehicles = be.getAllVehicle()
    plates = set()
    for v in vehicles:
        plates.add(v['numberPlate'])
        if '-' in v['numberPlate']:
            plates.add(v['numberPlate'].replace('-', ''))

    while True:
        if not queue.empty():
            frame = queue.get()
            if (car == True):
                # resized_frame = cv2.resize(frame, (640, 480))
                results = detect_model(frame)
                for result in results:
                    cv2.rectangle(frame, (int(result['coordinates'][0]),int(result['coordinates'][1])), (int(result['coordinates'][2]),int(result['coordinates'][3])), color = (0,0,225), thickness = 2)
                    cv2.putText(frame, result['number_license_plate'], (int(result['coordinates'][0]), int(result['coordinates'][1]-10)), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
                    if (result['number_license_plate'] in plates):
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

# Địa chỉ IP của ESP32-CAM
# esp32_cam_ip = host+":81"
# video_url = f"http://{esp32_cam_ip}/stream"
# vid = cv2.VideoCapture(video_url)
# if not vid.isOpened():
#     print("Không thể mở video từ ESP32-CAM")
#     exit()

# # Tạo hàng đợi để chứa frame
# frame_queue = queue.Queue()

# # Tạo và bắt đầu các luồng
# thread1 = threading.Thread(target=read_frames, args=(vid, frame_queue))
# thread2 = threading.Thread(target=process_frames, args=(frame_queue,))
# thread3 = threading.Thread(target=read_socket, args=(sock,))
# thread1.start()
# thread2.start()
# thread3.start()
# thread1.join()
# thread2.join()
# thread3.join()
# print("Các luồng đã kết thúc.")

be = BeService(base_api="http://localhost:3000/api")
host = "192.168.32.217"
port = 5005
lock = threading.Lock() 

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((host, port))
print("Connected to ESP32")
def main():

    while True:
            esp32_cam_ip = host + ":81"
            video_url = f"http://{esp32_cam_ip}/stream"
            vid = cv2.VideoCapture(video_url)
            if not vid.isOpened():
                raise Exception("Không thể mở video từ ESP32-CAM")
            
            frame_queue = queue.Queue()

            thread1 = threading.Thread(target=read_frames, args=(vid, frame_queue))
            thread2 = threading.Thread(target=process_frames, args=(frame_queue,))
            thread3 = threading.Thread(target=read_socket, args=(sock,))
            thread1.start()
            thread2.start()
            thread3.start()
            thread1.join()
            thread2.join()
            thread3.join()
            print("Các luồng đã kết thúc.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
            print(f"Error in main loop: {e}")
            time.sleep(5)
            main()


