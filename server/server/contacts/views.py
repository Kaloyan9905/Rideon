from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContactFormSerializer
from .utils import send_email


class ContactFormView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactFormSerializer(data=request.data)
        if serializer.is_valid():
            send_email(serializer.validated_data)
            return Response({"success": "Message sent!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
