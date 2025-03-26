from django.contrib import admin
from unfold.admin import ModelAdmin

from server.accounts.models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(ModelAdmin):
    list_display = ("first_name", "last_name", "status", "phone_number")
    list_filter = ("status",)
    search_fields = ("first_name", "last_name", "ucn")
    fieldsets = (
        ("Personal Info", {"fields": ("user", "first_name", "last_name", "date_of_birth")}),
        ("Contact", {"fields": ("phone_number", "profile_image")}),
        ("Status", {"fields": ("status", "document")}),
    )
