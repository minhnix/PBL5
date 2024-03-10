import easyocr
import cv2
from ultralytics import YOLO
from PIL import Image
import numpy as np


class Detect:
    def __init__(self, model_path = '.\model\detect_license_plate\\best.pt'):
        self.model_path = model_path
        self.model = YOLO(model_path)
        self.reader = easyocr.Reader(['en'])

    def __call__(self, image_path):
        return self.detect(image_path)
    
    def detect(self, image_path): 
        ALLOWED_LIST = "ABCDEFGHKLMNPSTUVXYZ0123456789-."
        results = self.model(image_path)
        image = Image.open(image_path)
        data = []
        for result in results:
            for i in result:
                x_min, y_min, x_max, y_max, confidence, class_id = i.tolist()  
                x_min, y_min, x_max, y_max = int(round(x_min)), int(round(y_min)), int(round(x_max)), int(round(y_max)) 
                cropped_image = image.crop((x_min, y_min, x_max, y_max))
                image_np = np.array(cropped_image)
                gray_image = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
                gray_image = cv2.bilateralFilter(gray_image, d=9, sigmaColor=75, sigmaSpace=75)
                text = self.reader.readtext(gray_image, allowlist=ALLOWED_LIST)
                extracted_text = [detection[1] for detection in text]
                cropped_image.save(image_path)
                obj = {
                    'licenseURL' : image_path,
                    'number': extracted_text
                }
                data.append(obj)
        return data