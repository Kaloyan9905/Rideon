from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status
from server.validator.services import PassValidator
from server.validator.exceptions import FailedToValidatePassException
from server.validator.serializers import QRDataSerializer


class ValidateQRCodeAPIView(generics.GenericAPIView):
    permission_classes = [IsAdminUser, IsAuthenticated]
    serializer_class = QRDataSerializer

    @staticmethod
    def create_response(is_valid, message, http_status):
        return Response({'is_valid': is_valid, 'message': message}, status=http_status)

    def post(self, request, *args, **kwargs):
        serializer = QRDataSerializer(data=request.data)

        if not serializer.is_valid():
            return self.create_response(False, 'Invalid data', status.HTTP_400_BAD_REQUEST)

        serial_number = serializer.validated_data['serial_number']

        try:
            validator = PassValidator.get_validator(serial_number)
            result = validator.validate()

            if result['is_valid']:
                return self.create_response(result['is_valid'], result['reason'], status.HTTP_200_OK)

            return self.create_response(result['is_valid'], result['reason'], status.HTTP_400_BAD_REQUEST)

        except FailedToValidatePassException as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
