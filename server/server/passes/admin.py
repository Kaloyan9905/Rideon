from django.contrib import admin
from unfold.admin import ModelAdmin

from server.passes.models import Ticket, Card


@admin.register(Ticket)
class TicketAdmin(ModelAdmin):
    list_display = ("serial_number", "owner", "expires_at", "is_used")
    list_filter = ("is_used",)
    readonly_fields = ("qr_code",)


@admin.register(Card)
class CardAdmin(ModelAdmin):
    list_display = ("serial_number", "owner", "expires_at", "last_used_at")
    readonly_fields = ("last_used_at",)
