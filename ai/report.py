from ultralytics import YOLO
from PIL import Image
import numpy as np

model_path = '.\model\detect_license_plate\\best.pt'

model = YOLO(model_path)

a = model.predict(r'https://cdn.thuvienphapluat.vn/uploads/tintuc/2023/08/17/bien-so-xe-dinh-danh.jpg', save=True, conf=0.5)

print(a)