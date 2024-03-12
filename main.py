import torch
from PIL import Image
import cv2
import helper
import rotate
import time

def crop_image(image, coordinates):
  x_min, y_min, x_max, y_max = coordinates
  return image.crop((x_min, y_min, x_max, y_max))

def get_bounding_box(box):
  return [round(x) for x in box.xyxy[0].tolist()]


if __name__ == "__main__":
    prev_frame_time = 0
    new_frame_time = 0


    model = torch.hub.load("ultralytics/yolov5", "custom", path="model/LP_detector_nano_61.pt",force_reload=True)
    yolo_license_plate = torch.hub.load('ultralytics/yolov5', 'custom', path='model/LP_ocr_nano_62.pt', force_reload=True)


    while True:
      img = input(r"Nhập đường dẫn tới ảnh: ")
      original_image = cv2.imread(img)
      plates = model(original_image, size=640)

      list_plates = plates.pandas().xyxy[0].values.tolist()

      list_read_plates = set()
      for plate in list_plates:
          flag = 0
          x = int(plate[0]) # xmin
          y = int(plate[1]) # ymin
          w = int(plate[2] - plate[0]) # xmax - xmin
          h = int(plate[3] - plate[1]) # ymax - ymin  
          crop_img = original_image[y:y+h, x:x+w]
          cv2.rectangle(original_image, (int(plate[0]),int(plate[1])), (int(plate[2]),int(plate[3])), color = (0,0,225), thickness = 2)
          cv2.imwrite("crop.jpg", crop_img)
          rc_image = cv2.imread("crop.jpg")
          lp = ""
          for cc in range(0,2):
              for ct in range(0,2):
                  lp = helper.read_plate(yolo_license_plate, rotate.deskew(crop_img, cc, ct))
                  if lp != "unknown":
                      list_read_plates.add(lp)
                      cv2.putText(original_image, lp, (int(plate[0]), int(plate[1]-10)), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
                      flag = 1
                      break
              if flag == 1:
                  break
              
      new_frame_time = time.time()
      fps = 1/(new_frame_time-prev_frame_time)
      prev_frame_time = new_frame_time
      fps = int(fps)
      cv2.putText(original_image, str(fps), (7, 70), cv2.FONT_HERSHEY_SIMPLEX, 2, (100, 255, 0), 3, cv2.LINE_AA)
      cv2.imshow('frame', original_image)
      cv2.waitKey(0)

      cv2.destroyAllWindows()
