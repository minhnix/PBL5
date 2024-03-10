import easyocr
import cv2
from ultralytics import YOLO
from PIL import Image
import numpy as np


if __name__ == "__main__":
    ALLOWED_LIST = "ABCDEFGHKLMNPSTUVXYZ0123456789-."
    reader = easyocr.Reader(['en'])
    model = YOLO('.\model\detect_license_plate\\best.pt')
    imageP = "viutzcdxt58ovj2zx46325wmli1sn1o5.jpg" # image path or url to image
    results = model(imageP)
    image = Image.open(imageP)
    for result in results:
        for i in result:
            x_min, y_min, x_max, y_max, confidence, class_id = i.tolist()  
            x_min, y_min, x_max, y_max = int(round(x_min)), int(round(y_min)), int(round(x_max)), int(round(y_max)) 
            cropped_image = image.crop((x_min, y_min, x_max, y_max))
            print(confidence)
            image_np = np.array(cropped_image)
            gray_image = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
            gray_image = cv2.bilateralFilter(gray_image, d=9, sigmaColor=75, sigmaSpace=75)
            cv2.imshow('Image', gray_image)
            cv2.waitKey(0)
            text = reader.readtext(gray_image, allowlist=ALLOWED_LIST)
            ocr = ""
            conf = 0.2
            extracted_text = [detection[1] for detection in text]
            
            print( extracted_text)
