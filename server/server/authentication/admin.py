from django.contrib import admin
from .models import AuthUser


@admin.register(AuthUser)
class AuthUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'is_staff')
    search_fields = ('email',)
    list_filter = ('is_active', 'is_staff')
