import easyocr
import cv2
from ultralytics import YOLO
from PIL import Image
import numpy as np

from utils.index import get_bounding_box, crop_image
from .ImageService import ImageService

class DetectService:
    def __init__(self, model_path = '.\model\detect_license_plate\\best.pt'):
        self.model_path = model_path
        self.model = YOLO(model_path)
        self.reader = easyocr.Reader(['en'])

    def __call__(self, original_image):
        return self.detect(original_image)
    
    def detect(self, original_image): 
        ALLOWED_LIST = "ABCDEFGHKLMNPSTUVXYZ0123456789-."
        results = self.model(original_image)
        data = []
        for result in results:
            for box in result.boxes:
                coords = get_bounding_box(box)
                image = crop_image(original_image, coords)
                text = self.reader.readtext(ImageService.to_gray_image(image), allowlist=ALLOWED_LIST)
                extracted_text = [detection[1] for detection in text]
                obj = {
                    'number_license_plate': extracted_text
                }
                data.append(obj)

        return data