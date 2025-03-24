import json

from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import generics, status

from server.validator.scanner import QRScanner
from server.validator.exceptions import GrabFrameException, FailedToValidatePassException
from server.validator.services import PassValidator

NO_QR_CODE_FOUND = 'There was no QR code detected'


class ScanQRCodeAPIView(generics.GenericAPIView):
    # permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        qr_scanner = QRScanner()

        try:
            qr_data = qr_scanner.scan()

            if qr_data is not None:
                decoded_data = json.loads(qr_data)
                serial_number = decoded_data['serial_number']

                validator = PassValidator.get_validator(serial_number)
                result = validator.validate()

                return Response({'message': result['message']}, status=result['status'])

        except GrabFrameException as exception:
            return Response({'message': str(exception)}, status.HTTP_500_INTERNAL_SERVER_ERROR)

        except FailedToValidatePassException:
            return Response({'message': NO_QR_CODE_FOUND}, status.HTTP_404_NOT_FOUND)

        finally:
            qr_scanner.release()
