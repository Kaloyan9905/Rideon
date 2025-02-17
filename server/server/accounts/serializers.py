from rest_framework import serializers
from server.accounts.models import UserProfile
from server.passes.serializers import CardSerializer, TicketSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    card = serializers.SerializerMethodField()
    tickets = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'card', 'tickets']
        read_only_fields = ['user']

    @staticmethod
    def get_user_card(card):
        return CardSerializer(card.card_files, many=True).data

    @staticmethod
    def get_user_tickets(ticket):
        return TicketSerializer(ticket.ticket_files, many=True).data
