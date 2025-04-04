import io
import qrcode
import json
from django.core.files.base import ContentFile
from django.db import models


class QRCode(models.Model):
    image = models.ImageField(upload_to='qr_codes/', null=True, blank=True)

    def generate_qr_code(self, serial_number, expires_at):
        qr_data = {
            'serial_number': serial_number,
            'expires_at': expires_at.isoformat()
        }

        qr_data_json = json.dumps(qr_data)

        qr = qrcode.make(qr_data_json)
        qr_bytes = io.BytesIO()
        qr.save(qr_bytes, format='PNG')

        self.image.save(f'qr_{serial_number}.png', ContentFile(qr_bytes.getvalue()), save=False)
        self.save()
