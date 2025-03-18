from rest_framework import serializers

from server.passes.mixins import QRCodeMixin
from server.passes.models import Ticket, Card


class TicketSerializer(serializers.ModelSerializer, QRCodeMixin):
    qr_image = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ['pk', 'serial_number', 'owner', 'expires_at', 'qr_image']
        read_only_fields = ['owner']


class CardSerializer(serializers.ModelSerializer, QRCodeMixin):
    qr_image = serializers.SerializerMethodField()

    class Meta:
        model = Card
        fields = ['pk', 'serial_number', 'owner', 'expires_at', 'qr_image']
        read_only_fields = ['owner']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user.profile
        validated_data['expires_at'] = validated_data.get('expires_at')
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.expires_at = validated_data.get('expires_at')
        instance.save()
        return instance
