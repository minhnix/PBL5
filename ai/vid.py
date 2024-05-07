from ultralytics import YOLO
import cv2

from PIL import Image
from service.DetectService import DetectService
from service.ImageService import ImageService
import os
import time

detect_model = DetectService() 
prev_frame_time = 0
new_frame_time = 0

esp32_cam_ip = "192.168.171.251:81"

# URL để truy cập video từ ESP32-CAM
video_url = f"http://{esp32_cam_ip}/stream"
vid = cv2.VideoCapture(video_url)
if not vid.isOpened():
    print("Không thể mở video từ ESP32-CAM")
    exit()

# while True:
#     ret, frame = vid.read()
#     if not ret:
#         print("Không thể đọc video")
#         break
#     new_frame_time = time.time()
#     fps = 1/(new_frame_time-prev_frame_time)
#     prev_frame_time = new_frame_time
#     fps = int(fps)
#     cv2.putText(frame, str(fps), (7, 70), cv2.FONT_HERSHEY_SIMPLEX, 3, (100, 255, 0), 3, cv2.LINE_AA)
#     cv2.imshow('frame', frame)

#     # cv2.imshow('ESP32-CAM Video', frame)
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Giải phóng tài nguyên và đóng cửa sổ hiển thị video khi kết thúc
# vid.release()
# cv2.destroyAllWindows()
 
# vid = cv2.VideoCapture(r"http://192.168.171.251:81/stream")
# if not vid.isOpened():
#     print("Không thể mở video từ ESP32-CAM")
#     exit()

# vid = cv2.VideoCapture(r"C:\\Users\84948\Downloads\\xe\63edae77-9a22-4220-8e0e-92291697b73d.mp4")
count = 0
while True:
    # Read a frame from the video
    success, frame = vid.read()
    if success:
        count += 1
        results = detect_model(frame)
        for result in results:
            cv2.rectangle(frame, (int(result['coordinates'][0]),int(result['coordinates'][1])), (int(result['coordinates'][2]),int(result['coordinates'][3])), color = (0,0,225), thickness = 2)
            cv2.putText(frame, result['number_license_plate'], (int(result['coordinates'][0]), int(result['coordinates'][1]-10)), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
            # if (result['number_license_plate'] == "43AA-30078"):
            #     print("OKE PRO VIP")
                ## TODO: Gửi dữ liệu lên server
        new_frame_time = time.time()
        fps = 1/(new_frame_time-prev_frame_time)
        print (count)
        prev_frame_time = new_frame_time
        fps = int(fps)
        cv2.putText(frame, str(fps), (7, 70), cv2.FONT_HERSHEY_SIMPLEX, 3, (100, 255, 0), 3, cv2.LINE_AA)
        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
    else:
        # Break the loop if the end of the video is reached
        break
# Release the video capture object and close the display window
vid.release()
cv2.destroyAllWindows()
