from django.urls import path

from server.validator import views

urlpatterns = (
    path('validate/', views.ValidateQRCodeAPIView.as_view(), name='validate-pass'),
)
