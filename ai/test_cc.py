import requests
import random
import time

ipCC = "http://192.168.133.10"
url = ipCC + '/cc'

def send_random_degrees():

        data = {
            'degrees': 90,
        }

        try:
            response = requests.post(url, data=data)
        except Exception as e:
            print("Error:", e)
        

if __name__ == '__main__':
    send_random_degrees()
