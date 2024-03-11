import numpy as np
import cv2


class ImageService: 
  def __init__(self, conf):
    self.conf = conf
  
  @staticmethod
  def to_gray_image(image):
    image_np = np.array(image)
    gray_image = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
    gray_image = cv2.bilateralFilter(gray_image, d=9, sigmaColor=75, sigmaSpace=75)
    return gray_image

