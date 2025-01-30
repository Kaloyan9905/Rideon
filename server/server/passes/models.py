from django.utils import timezone
from django.db import models

from server.accounts.models import UserProfile


class Pass(models.Model):
    SERIAL_NUMBER_MAX_LENGTH = 14

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField()

    serial_number = models.CharField(max_length=SERIAL_NUMBER_MAX_LENGTH, unique=True)
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    # qr_code = models.OneToOneField(QRCode, on_delete=models.CASCADE)

    class Meta:
        abstract = True

    def is_expired(self):
        return self.expires_at < timezone.now()


class SingleUsePass(Pass):
    is_used = models.BooleanField(default=False)

    class Meta:
        abstract = True

    def use(self):
        self.is_used = True
        self.save()


class ReusablePass(Pass):
    last_used_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True

    def use(self):
        self.last_used_at = timezone.now()
        self.save()


class Ticket(SingleUsePass):
    pass


class Card(ReusablePass):
    pass
