from service.BeService import BeService

import cv2

service = BeService(base_api="http://localhost:3000/api")

print(service.getAllVehicle())

data = {
        'numberPlate': '29C1-99999',
        'typeStatus': 'in',    
}
file_path = "D:/tet/DH/PBL5/ai/images/0add9f6e-daaa-4f7c-bd58-ff692faf7b55.jpg"

# file = cv2.imread(file_path)
# # _, img_encoded = cv2.imencode('.jpg', frame)
# #     # Chuyển đổi dữ liệu thành mảng byte
# # frame_bytes = img_encoded.tobytes()
# _, img_encoded = cv2.imencode('.jpg', file)
# # Chuyển đổi dữ liệu thành mảng byte
# img_bytes = img_encoded.tobytes()

img = cv2.imread(file_path)

# Chuyển đổi hình ảnh thành dạng byte
_, img_encoded = cv2.imencode('.jpg', img)
# Chuyển đổi dữ liệu thành mảng byte
img_bytes = img_encoded.tobytes()

print(service.postHistory(file=img_bytes, data=data))