from abc import ABC, abstractmethod
from django.utils import timezone
from server.passes.models import Ticket, Card
from server.validator.exceptions import FailedToValidatePassException


class PassValidator(ABC):
    def __init__(self, pass_instance):
        self.pass_instance = pass_instance

    @abstractmethod
    def validate(self):
        pass

    @staticmethod
    def get_validator(serial_number):
        ticket = Ticket.objects.filter(serial_number=serial_number).first()

        if ticket:
            return TicketValidator(ticket)

        card = Card.objects.filter(serial_number=serial_number).first()

        if card:
            return CardValidator(card)

        raise FailedToValidatePassException('Invalid Pass')

    def is_expired(self):
        return self.pass_instance.expires_at < timezone.now()


class TicketValidator(PassValidator):
    def __init__(self, ticket):
        super().__init__(ticket)

    def validate(self):
        if self.pass_instance.is_used:
            return {'is_valid': False, 'reason': 'Ticket Used'}

        self.pass_instance.use()

        if self.is_expired():
            return {'is_valid': False, 'reason': 'Ticket Expired'}

        return {'is_valid': True, 'reason': 'Valid Ticket'}


class CardValidator(PassValidator):
    def __init__(self, card):
        super().__init__(card)

    def validate(self):
        if self.is_expired():
            return {'is_valid': False, 'reason': 'Card Expired'}

        self.pass_instance.use()
        return {'is_valid': True, 'reason': 'Valid Card'}
