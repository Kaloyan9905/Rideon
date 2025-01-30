import uuid
from sqlite3 import IntegrityError

from django.utils import timezone

from server.passes.models import Ticket


def create_ticket_for_user(profile, max_attempts=5):
    now = timezone.now()
    end_of_day = now.replace(hour=23, minute=59, second=59, microsecond=999999)

    for attempt in range(max_attempts):
        try:
            ticket = Ticket.objects.create(
                expires_at=end_of_day,
                serial_number=generate_serial_number(),
                owner=profile,
            )
            return ticket

        except IntegrityError:
            if attempt == max_attempts - 1:
                raise ValueError('Failed to purchase ticket!')


def generate_serial_number():
    return str(uuid.uuid4())[:14]
