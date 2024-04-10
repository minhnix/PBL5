from ultralytics import YOLO
from PIL import Image
import numpy as np

from utils.index import get_bounding_box, crop_image, check_point_linear, linear_equation, deskew
from .ImageService import ImageService

class DetectService:
    def __init__(self, model_path = '.\model\detect_license_plate\\best.pt', reader_path = '.\model\ocr\\best.pt'):
        self.model_path = model_path
        self.model = YOLO(model_path)
        self.reader_model = YOLO(reader_path)

    def __call__(self, original_image):
        return self.detect(original_image)
    
    def detect(self, original_image): 
        results = self.model(original_image, conf=0.5)
        data = []
        for result in results:
            for box in result.boxes:
                    coordinates = get_bounding_box(box)
                    image = crop_image(original_image, coordinates)
                    plate = None
                    for cc in range(0,2):
                        for ct in range(0,2):
                            text = self.read_license_plate(deskew(image, cc, ct))
                            if text != "unknown":
                                plate = text
                                break
                        if plate != None:
                            break
                    obj = {
                        'number_license_plate': plate,
                        'coordinates': coordinates
                    }
                    data.append(obj)

        return data

    def get_license_plate_image(self, original_image):
        results = self.model(original_image)
        images = []
        for result in results:
            for box in result.boxes:
                coordinates = get_bounding_box(box)
                image = crop_image(original_image, coordinates)
                images.append(image)
        return images
    
    def read_license_plate(self, original_image): 
        results = self.reader_model(original_image)
        for result in results:
            return self.read_plate_from_result(result) # only 1 image in results

    def read_plate_from_result(self, result):
        LP_type = "1"
        bb_list = result.boxes.data.tolist()
        length = len(bb_list)
        if length == 0 or length < 7 or length > 10:
            return "unknown"
        center_list = []
        y_mean = 0
        y_sum = 0
        for bb in bb_list:
            x_c = (bb[0]+bb[2])/2
            y_c = (bb[1]+bb[3])/2
            y_sum += y_c
            center_list.append([x_c,y_c,self.reader_model.names[bb[-1]]])

        # find 2 point to draw line
        l_point = center_list[0]
        r_point = center_list[0]
        for cp in center_list:
            if cp[0] < l_point[0]:
                l_point = cp
            if cp[0] > r_point[0]:
                r_point = cp
        for ct in center_list:
            if l_point[0] != r_point[0]:
                if (check_point_linear(ct[0], ct[1], l_point[0], l_point[1], r_point[0], r_point[1]) == False):
                    LP_type = "2"

        y_mean = int(int(y_sum) / len(bb_list))

        # 1 line plates and 2 line plates
        line_1 = []
        line_2 = []
        license_plate = ""
        if LP_type == "2":
            for c in center_list:
                if int(c[1]) > y_mean:
                    line_2.append(c)
                else:
                    line_1.append(c)
            for l1 in sorted(line_1, key = lambda x: x[0]):
                license_plate += str(l1[2])
            license_plate += "-"
            for l2 in sorted(line_2, key = lambda x: x[0]):
                license_plate += str(l2[2])
        else:
            for l in sorted(center_list, key = lambda x: x[0]):
                license_plate += str(l[2])
        return license_plate