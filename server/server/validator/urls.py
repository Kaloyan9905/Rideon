from django.urls import path

from server.validator import views

urlpatterns = (
    path('scan/', views.ScanQRCodeAPIView.as_view(), name='scan-pass'),
)
