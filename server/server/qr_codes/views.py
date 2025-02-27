from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


from server.passes.models import Ticket, Card
from server.qr_codes.models import QRCode
from server.qr_codes.serializers import QRCodeSerializer


class QRCodeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, model_name):
        if model_name == 'ticket':
            try:
                ticket = Ticket.objects.get(pk=pk, owner=request.user.profile)
                qr_code, created = QRCode.objects.get_or_create(ticket=ticket)
            except Ticket.DoesNotExist:
                return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)
        elif model_name == 'card':
            try:
                card = Card.objects.get(pk=pk, owner=request.user.profile)
                qr_code, created = QRCode.objects.get_or_create(card=card)
            except Card.DoesNotExist:
                return Response({'error': 'Card not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Invalid model name.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = QRCodeSerializer(qr_code)
        
        return Response(serializer.data)
