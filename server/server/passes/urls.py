from django.urls import path, include

from server.passes import views

urlpatterns = (
    path('create-card/', views.CardCreateAPIView.as_view(), name='create_card'),
    path('<int:pk>/', include([
        path('details-card/', views.DetailsCardAPIView.as_view(), name='details_card'),
        path('update-card/', views.UpdateCardAPIView.as_view(), name='update_card'),
        path('delete-card/', views.DeleteCardAPIView.as_view(), name='delete_card'),
    ])),
    path('purchase-ticket/', views.PurchaseTicketAPIView.as_view(), name='purchase_tickets'),
)
