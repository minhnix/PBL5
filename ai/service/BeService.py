import requests
import json


class BeService:
    def __init__(self, base_api):
        self.base_api = base_api
    
    def getAllVehicle(self):
        res = requests.get(self.base_api + '/vehicles?limit=1000')
        return res.json()['data']['vehicles']
    
    def postHistory(self, file, data):
        # data = {
        #    'numberPlate': 'string',
        #    'typeStatus': 'in, out',    
        # }
        files = {'file': file}
        res = requests.post(self.base_api + '/history', files=files, data=data)
        return res.json()