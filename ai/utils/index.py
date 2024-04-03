import math
def crop_image(image, coordinates):
  x_min, y_min, x_max, y_max = coordinates
  return image.crop((x_min, y_min, x_max, y_max))

def get_bounding_box(box):
  return [round(x) for x in box.xyxy[0].tolist()]

def linear_equation(x1, y1, x2, y2):
    b = y1 - (y2 - y1) * x1 / (x2 - x1)
    a = (y1 - b) / x1
    return a, b

def check_point_linear(x, y, x1, y1, x2, y2):
    a, b = linear_equation(x1, y1, x2, y2)
    y_pred = a*x+b
    return(math.isclose(y_pred, y, abs_tol = 3))
