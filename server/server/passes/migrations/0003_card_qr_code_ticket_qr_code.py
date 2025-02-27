# Generated by Django 5.1.4 on 2025-02-27 12:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('passes', '0002_alter_card_serial_number_alter_ticket_serial_number'),
        ('qr_codes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='qr_code',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='qr_codes.qrcode'),
        ),
        migrations.AddField(
            model_name='ticket',
            name='qr_code',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='qr_codes.qrcode'),
        ),
    ]
