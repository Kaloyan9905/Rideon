from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authenticate/', include('server.authentication.urls')),
    path('api/', include('server.accounts.urls')),
]

if settings.DEBUG:  # Serve media files only in development mode
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)