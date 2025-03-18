from rest_framework import serializers
from server.accounts.models import UserProfile
from server.passes.models import Ticket, Card
from server.passes.serializers import CardSerializer, TicketSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    card = serializers.SerializerMethodField()
    tickets = serializers.SerializerMethodField()
    is_superuser = serializers.BooleanField(source='user.is_superuser', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name',
                  'ucn', 'date_of_birth', 'phone_number',
                  'is_superuser', 'card', 'tickets']
        read_only_fields = ['user']

    @staticmethod
    def get_card(obj):
        card = Card.objects.filter(owner=obj).first()
        return CardSerializer(card).data if card else None

    @staticmethod
    def get_tickets(obj):
        tickets = Ticket.objects.filter(owner=obj)
        return TicketSerializer(tickets, many=True).data
