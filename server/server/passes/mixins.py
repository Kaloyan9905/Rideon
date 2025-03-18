from rest_framework import serializers

from server.passes.models import Ticket, Card


class QRCodeMixin:
    qr_image = serializers.SerializerMethodField()

    @staticmethod
    def get_qr_image(obj):
        if not isinstance(obj, (Ticket, Card)):
            return None

        if not obj.qr_code or not hasattr(obj.qr_code, 'image'):
            return None

        return obj.qr_code.image.url if obj.qr_code.image else None
