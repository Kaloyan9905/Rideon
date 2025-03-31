from rest_framework.response import Response
from rest_framework import generics, status
from server.validator.services import PassValidator
from server.validator.exceptions import FailedToValidatePassException


class ValidateQRCodeAPIView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        try:
            qr_data = request.data

            if 'serial_number' not in qr_data:
                return Response({'error': 'Missing serial_number'}, status=status.HTTP_400_BAD_REQUEST)

            serial_number = qr_data['serial_number']

            try:
                validator = PassValidator.get_validator(serial_number)
                result = validator.validate()

                if result['is_valid']:
                    return Response({'message': result['reason']}, status=status.HTTP_200_OK)

                return Response({'message': result['reason']}, status=status.HTTP_400_BAD_REQUEST)

            except FailedToValidatePassException as e:
                return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
