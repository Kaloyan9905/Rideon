from django.urls import path
from .views import CreateFundSession
from .webhooks import stripe_webhook

urlpatterns = [
    path("stripe-webhook/", stripe_webhook),
]
