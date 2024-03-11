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
    image_np = np.array(image)
    gray_image = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
    gray_image = cv2.bilateralFilter(gray_image, d=9, sigmaColor=75, sigmaSpace=75)
    return gray_image

  @staticmethod
  def label(image_file, data): 
    img = Image.open(image_file.stream).copy()

    # Convert the image to RGBA mode for a wider color range
    img = img.convert("RGBA")
    draw = ImageDraw.Draw(img)
    font = ImageFont.load_default(15)

    for obj in data:
        x1, y1, x2, y2 = obj['coordinates']
        label = obj["number_license_plate"]

        draw.rectangle([x1, y1, x2, y2], outline='red', width=3)
        # Vẽ chữ
        draw.text((x1 + 2, y1 - 15 - 4), f"{label}", fill='red', font=font)

    # Save the modified image as bytes and return
    img = img.convert("RGB")  # Convert back to RGB mode before saving
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='JPEG')
    img_bytes.seek(0)

    # only in demo
    save_directory = "images/"
    os.makedirs(save_directory, exist_ok=True)
    file_path = os.path.join(save_directory, image_file.filename)
    with open(file_path, "wb") as f:
        f.write(img_bytes.read())

    return img_bytes
    
