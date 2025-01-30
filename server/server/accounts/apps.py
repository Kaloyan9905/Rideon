from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'server.accounts'

    def ready(self):
        import server.accounts.signals