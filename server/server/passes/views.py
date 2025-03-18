from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from server.passes.models import Card, Ticket
from server.passes.serializers import CardSerializer, TicketSerializer
from server.passes.services import CardService, TicketService


class CardCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def perform_create(self, serializer):
        return CardService.create_card(
            self.request.user.profile,
            serializer.validated_data
        )


class DetailsCardAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user.profile)


class UpdateCardAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def perform_update(self, serializer):
        return CardService.update_card(
            self.request.user.profile,
            self.get_object(),
            serializer.validated_data
        )


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
            ticket = TicketService.create_ticket(self.request.user.profile)
            serializer = self.get_serializer(ticket)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ValueError as error:
            return Response({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
