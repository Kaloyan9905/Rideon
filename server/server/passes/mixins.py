from rest_framework import serializers


class QRCodeMixin:
    qr_image = serializers.SerializerMethodField()

    def get_qr_image(self, obj):
        if obj.qr_code and hasattr(obj.qr_code, 'image'):
            return obj.qr_code.image.url if obj.qr_code.image else None
        return None
