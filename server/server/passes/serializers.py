from rest_framework import serializers
from server.passes.models import Ticket, Card
from server.validator.serializers import QRCodeSerializer


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['pk', 'serial_number', 'owner', 'expires_at', 'qr_code']
        read_only_fields = ['owner', 'qr_code']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['pk', 'serial_number', 'owner', 'expires_at', 'qr_code']
        read_only_fields = ['owner', 'qr_code']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user.profile
        validated_data['expires_at'] = validated_data.get('expires_at')
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.expires_at = validated_data.get('expires_at')
        instance.save()
        return instance
