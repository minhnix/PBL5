from service.BeService import BeService
import threading

be = BeService(base_api="http://localhost:3000/api")

class Plates:
    plates = set()
    lock = threading.Lock()



    @classmethod
    def plate(cls):
        vehicles = be.getAllVehicle()
        with cls.lock:
            cls.plates = set()
        plate = set()
        for v in vehicles:
            plate.add(v['numberPlate'])
            if '-' in v['numberPlate']:
                plate.add(v['numberPlate'].replace('-', ''))

        with cls.lock:
            cls.plates = plate

    @classmethod
    def get(cls):
        with cls.lock:
            return cls.plates
