import qrcode
from io import BytesIO
from django.db import models
from django.core.files.base import ContentFile


class QRCode(models.Model):
    image = models.ImageField(upload_to='qr_codes/', null=True, blank=True)

    def generate_qr_code(self, data, expires_at):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )

        qr.add_data(f"{data}|{expires_at}")
        qr.make(fit=True)

        img = qr.make_image(fill='black', back_color='white')

        buffer = BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)
        self.image.save(f'{data}_qr.png', ContentFile(buffer.read()), save=False)
