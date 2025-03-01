from datetime import datetime


def ticket_is_expired(date) -> bool:
    ticket_date = datetime.strptime(date, "%Y-%m-%d")
    today = datetime.now().date()
    return ticket_date.date() < today
