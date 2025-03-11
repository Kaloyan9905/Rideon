from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from server.passes.models import Card, Ticket
from server.passes.serializers import CardSerializer, TicketSerializer
from server.passes.utils import create_ticket_for_user


class CardCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class DetailsCardAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user.profile)


class UpdateCardAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def get_object(self):
        obj = super().get_object()

        if not obj.owner == self.request.user.profile:
            raise PermissionDenied("You do not have permission to edit this card.")

        return obj


class DeleteCardAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class PurchaseTicketAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def create(self, request, *args, **kwargs):
        try:
            ticket = create_ticket_for_user(self.request.user.profile)
            serializer = self.get_serializer(ticket)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ValueError as error:
            return Response({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
