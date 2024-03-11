import easyocr
import cv2
from ultralytics import YOLO
from PIL import Image
import numpy as np

from utils.index import get_bounding_box, crop_image
from service.ImageService import ImageService



if __name__ == "__main__":
    ALLOWED_LIST = "ABCDEFGHKLMNPSTUVXYZ0123456789-."
    reader = easyocr.Reader(['en'])
    model = YOLO('.\model\detect_license_plate\\best.pt')
    # model.predict(source="0")
    imageP = "images/2.jpg" # image path or url to image
    original_image = Image.open(imageP)
    results = model.predict(source=original_image)  # save predictions as labels

    for result in results:
        for box in result.boxes:
            coords = get_bounding_box(box)
            image = crop_image(original_image, coords)
            text = reader.readtext(ImageService.to_gray_image(image))
            extracted_text = [detection[1] for detection in text]
            print( extracted_text)
