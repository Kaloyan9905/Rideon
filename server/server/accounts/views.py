from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from server.accounts.models import UserProfile
from server.accounts.serializers import UserProfileSerializer
from rest_framework.parsers import MultiPartParser, FormParser


class UserProfileView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)

    def perform_destroy(self, instance):
        user = instance.user
        instance.delete()
        user.delete()
