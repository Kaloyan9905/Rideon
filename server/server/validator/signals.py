from django.db.models.signals import pre_save
from django.dispatch import receiver
from server.passes.models import Ticket, Card
from server.validator.models import QRCode


def generate_qr_for_instance(instance):
    qr_code = QRCode.objects.create()
    qr_code.generate_qr_code(instance.serial_number, instance.expires_at)

    instance.qr_code = qr_code


@receiver(pre_save, sender=Ticket)
def create_qr_code_for_ticket(sender, instance, **kwargs):
    if not instance.pk:
        generate_qr_for_instance(instance)


@receiver(pre_save, sender=Card)
def create_qr_code_for_card(sender, instance, **kwargs):
    if not instance.pk:
        generate_qr_for_instance(instance)
