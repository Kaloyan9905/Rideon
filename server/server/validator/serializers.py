from rest_framework import serializers

from server.validator.models import QRCode


class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = ['image']


class QRDataSerializer(serializers.Serializer):
    serial_number = serializers.CharField(max_length=14)
