def crop_image(image, coordinates):
  x_min, y_min, x_max, y_max = coordinates
  return image.crop((x_min, y_min, x_max, y_max))

def get_bounding_box(box):
  return [round(x) for x in box.xyxy[0].tolist()]