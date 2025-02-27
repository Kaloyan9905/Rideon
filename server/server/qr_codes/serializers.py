from rest_framework import serializers
from server.qr_codes.models import QRCode


class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = ['image']
