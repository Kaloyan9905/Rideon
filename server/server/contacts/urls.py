from django.urls import path

from server.contacts import views

urlpatterns = (
    path('', views.ContactFormView.as_view(), name='contact-form'),
)
