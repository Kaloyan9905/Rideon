from rest_framework import serializers

from server.passes.models import Ticket, Card


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['pk', 'serial_number', 'owner', 'expires_at']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['pk', 'serial_number', 'owner', 'expires_at']
        read_only_fields = ['owner']
