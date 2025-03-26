from django.contrib import admin
from unfold.admin import ModelAdmin

from server.authentication.models import AuthUser


@admin.register(AuthUser)
class AuthUserAdmin(ModelAdmin):
    list_display = ("email", "is_active", "is_staff")
    search_fields = ("email",)
    list_filter = ("is_active", "is_staff")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "groups")}),
    )
