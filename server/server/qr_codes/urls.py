from django.urls import path
from .views import QRCodeAPIView

urlpatterns = [
    path('generate_qr/<str:model_name>/<int:pk>/', QRCodeAPIView.as_view(), name='generate_qr_code'),
]
