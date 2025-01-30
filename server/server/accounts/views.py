from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from server.accounts.models import UserProfile
from server.accounts.serializers import UserProfileSerializer


class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
