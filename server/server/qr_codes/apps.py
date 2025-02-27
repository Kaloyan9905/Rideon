from django.apps import AppConfig


class QrCodesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'server.qr_codes'

    def ready(self):
        import server.qr_codes.signals
