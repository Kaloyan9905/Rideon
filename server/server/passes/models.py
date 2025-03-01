import uuid

from django.utils import timezone
from django.db import models

from server.accounts.models import UserProfile
from server.validator.models import QRCode


class Pass(models.Model):
    SERIAL_NUMBER_MAX_LENGTH = 14

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField()

    serial_number = models.CharField(
        max_length=SERIAL_NUMBER_MAX_LENGTH,
        unique=True,
        blank=True,
        editable=False,
    )

    qr_code = models.OneToOneField(QRCode, on_delete=models.CASCADE)

    class Meta:
        abstract = True

    @staticmethod
    def generate_serial_number():
        return str(uuid.uuid4())[:14]

    def save(self, *args, **kwargs):
        if not self.serial_number:
            self.serial_number = self.generate_serial_number()

        super().save(*args, **kwargs)


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
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='tickets')


class Card(ReusablePass):
    owner = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='card')
