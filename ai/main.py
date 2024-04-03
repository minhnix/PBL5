from PIL import Image
from service.DetectService import DetectService

detect_model = DetectService() 



if __name__ == "__main__":
    while True:
        imgP = input(r"Nhập đường dẫn tới ảnh: ")
        original_image = Image.open(imgP)
        result = detect_model(original_image)
        print (result)
