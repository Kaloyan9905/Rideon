from django.urls import path

from server.passes import views

urlpatterns = (
    path('purchase-ticket/', views.PurchaseTicketAPIView.as_view(), name='purchase_tickets'),
)
