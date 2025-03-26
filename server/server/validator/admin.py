from django.contrib import admin
from unfold.admin import ModelAdmin
from django.utils.html import format_html

from server.validator.models import QRCode


@admin.register(QRCode)
class QRCodeAdmin(ModelAdmin):
    list_display = ("display_qr_code",)

    def display_qr_code(self, obj):
        return format_html(f'<img src="{obj.image.url}" width="100" />')

    display_qr_code.short_description = "QR Code"
