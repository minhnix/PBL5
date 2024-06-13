import socket
import threading
import time
import random

# Địa chỉ IP và cổng của ESP32
host = "192.168.1.2"
port = 5005

# Tạo socket và kết nối đến ESP32
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((host, port))
print("Connected to ESP32")


# def t_input(sock):
#     try:
#         while True:
#             # message = input("Enter message to send to ESP32: ")
#             sock.sendall("1".encode("utf-8"))
#             time.sleep(1000)
#             # data = sock.recv(1024)
#             # print("Received data from ESP32:", data.decode("utf-8"))
#     except KeyboardInterrupt:
#         print("\nExiting program...")
#     finally:
#         sock.close()

def output(sock):
    try:
        while True:
            data = sock.recv(1024).decode("utf-8")
            print("Received data :", data)
            if ("Có xe tới" in data):
                print("Đã xử lý")
                sock.sendall("PLATE".encode("utf-8"))
    except KeyboardInterrupt:
        print("\nExiting program...")
    finally:
        sock.close()

# thread1 = threading.Thread(target=t_input, args=(sock,))
thread2 = threading.Thread(target=output, args=(sock,))
# thread1.start()
thread2.start()

# thread1.join()
thread2.join()

sock.close()