from django.apps import AppConfig


class ValidatorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'server.validator'

    def ready(self):
        import server.validator.signals
