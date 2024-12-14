from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from server.authentication.serializers import SignUpSerializer, MyTokenObtainPairSerializer, AuthUserSerializer

UserModel = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class SignUpAPIView(generics.CreateAPIView):
    serializer_class = SignUpSerializer


@api_view(['GET'])
def getLoggedInUser(request):
    if request.user.is_authenticated:
        serializer = AuthUserSerializer(request.user)
        return Response(serializer.data)
    else:
        return Response({"detail": "User is not authenticated."}, status=401)
