from PIL import Image
from service.DetectService import DetectService
from service.ImageService import ImageService
import cv2

detect_model = DetectService() 



if __name__ == "__main__":
    while True:
        imgP = input(r"Nhập đường dẫn tới ảnh: ")
        original_image = cv2.imread(imgP)
        result = detect_model(original_image)
        ImageService.label(original_image, result)
        print (result)
