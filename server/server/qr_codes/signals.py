from django.db.models.signals import post_save
from django.dispatch import receiver
from server.passes.models import Ticket, Card
from server.qr_codes.models import QRCode


@receiver(post_save, sender=Ticket)
def create_qr_code_for_ticket(sender, instance, created, **kwargs):
    if created:
        qr_code = QRCode.objects.create()
        qr_code.generate_qr_code(instance.serial_number, instance.expires_at)
        qr_code.save()


@receiver(post_save, sender=Card)
def create_qr_code_for_card(sender, instance, created, **kwargs):
    if created:
        qr_code = QRCode.objects.create()
        qr_code.generate_qr_code(instance.serial_number, instance.expires_at)
        qr_code.save()
