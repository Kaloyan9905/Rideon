import time

import cv2
from server.validator.camera import Camera
from server.validator.exceptions import GrabFrameException, FailedToValidatePassException


class QRScanner:
    FAILED_TO_GRAB_FRAME = 'Failed to grab frame'
    FAILED_TO_VALIDATE_PASS = 'Failed to validate pass in the desired time'

    def __init__(self):
        self.camera = Camera()
        self.qr_detector = cv2.QRCodeDetector()

    def detect_and_decode(self, frame) -> str:
        data, _, _ = self.qr_detector.detectAndDecode(frame)
        return data

    def scan(self, duration: int = 10) -> str | None:
        end_time = time.time() + duration

        while time.time() < end_time:
            frame = self.camera.get_frame()

            if frame is None:
                raise GrabFrameException(self.FAILED_TO_GRAB_FRAME)

            data = self.detect_and_decode(frame)

            if data:
                return data

        raise FailedToValidatePassException(self.FAILED_TO_VALIDATE_PASS)

    def release(self) -> None:
        self.camera.release()
