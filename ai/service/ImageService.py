import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont
import io
import os

class ImageService: 
  def __init__(self, conf):
    self.conf = conf
  
  @staticmethod
  def to_gray_image(image):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # blurred = cv2.GaussianBlur(gray_image, (5, 5), 0)    
    return gray_image

  @staticmethod
  def label(image, data, file_name): 
    image_numpy = np.array(image)
    for obj in data:
        x1, y1, x2, y2 = obj['coordinates']
        label = obj["number_license_plate"]

        cv2.rectangle(image_numpy, (int(x1),int(y1)), (int(x2),int(y2)), color = (0,0,225), thickness = 2)
        cv2.putText(image_numpy, label, (int(x1), int(y1-10)), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)


    # only in demo
    save_directory = "images/"
    os.makedirs(save_directory, exist_ok=True)
    file_path = os.path.join(save_directory, file_name)
    cv2.imwrite(file_path, image_numpy)    

    return image_numpy