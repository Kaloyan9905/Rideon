from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from server.passes.models import Card
from server.passes.serializers import CardSerializer


class CardCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.profile)
