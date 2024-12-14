from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from server.authentication import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('sign-up/', views.SignUpAPIView.as_view(), name='sign-up'),
    path('account/', views.getLoggedInUser),
]
