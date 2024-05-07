from PIL import Image
from service.DetectService import DetectService
from service.ImageService import ImageService
import cv2
import os


detect_model = DetectService() 



if __name__ == "__main__":
    while True:
        imgP = input(r"Nhập đường dẫn tới ảnh: ")
        original_image = cv2.imread(imgP)
        file_name = os.path.basename(imgP)
        result = detect_model(original_image)
        ImageService.label(original_image, result, file_name)
        print (result)
