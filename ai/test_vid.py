import requests
import cv2
import numpy as np

# Địa chỉ IP của ESP32-CAM
esp32_cam_ip = "192.168.1.6:81"

# URL để truy cập video từ ESP32-CAM
video_url = f"http://{esp32_cam_ip}/stream"

# Mở kết nối đến ESP32-CAM
response = requests.get(video_url, stream=True, headers={
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Connection": "keep-alive",
    
    
    })

# print(response)
# Kiểm tra xem kết nối có thành công không
if response.status_code != 200:
    print("Không thể kết nối đến ESP32-CAM")
    exit()

# Đọc dữ liệu video từ response
bytes = bytes()
for chunk in response.iter_content(chunk_size=1024):
    bytes += chunk
    a = bytes.find(b'\xff\xd8')
    b = bytes.find(b'\xff\xd9')
    if a != -1 and b != -1:
        jpg = bytes[a:b+2]
        bytes = bytes[b+2:]
        # Decode và hiển thị hình ảnh
        frame = cv2.imdecode(np.frombuffer(jpg, dtype=np.uint8), cv2.IMREAD_COLOR)
        cv2.imshow('ESP32-CAM Video', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

# Giải phóng tài nguyên và đóng cửa sổ hiển thị video khi kết thúc
cv2.destroyAllWindows()
