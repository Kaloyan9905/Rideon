from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'status')
    search_fields = ('user__email', 'first_name', 'last_name')
    list_filter = ('status',)