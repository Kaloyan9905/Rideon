from rest_framework.response import Response
from rest_framework import generics, status

from server.validator.exceptions import GrabFrameException, FailedToValidatePassException
from server.validator.scanner import QRScanner
from server.validator.utils import ticket_is_expired

NO_QR_CODE_FOUND = 'There was no QR code detected'


class ScanQRCodeAPIView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        qr_scanner = QRScanner()

        try:
            qr_data = qr_scanner.scan()

            if qr_data is not None:
                if ticket_is_expired(qr_data):
                    return Response({'message': 'Ticket Expired'}, status.HTTP_200_OK)

                return Response({'message': f'Valid Ticket'}, status.HTTP_200_OK)

        except GrabFrameException as exception:
            return Response({'message': str(exception)}, status.HTTP_500_INTERNAL_SERVER_ERROR)

        except FailedToValidatePassException as exception:
            return Response({'message': NO_QR_CODE_FOUND}, status.HTTP_404_NOT_FOUND)

        finally:
            qr_scanner.release()
