from rest_framework.exceptions import PermissionDenied

from server.passes.models import Card
from server.passes.utils import create_ticket_for_user


class CardService:
    @staticmethod
    def create_card(owner, validated_data):
        validated_data['owner'] = owner
        return Card.objects.create(**validated_data)

    @staticmethod
    def update_card(owner, card, validated_data):
        if not card.owner == owner or not owner.profile.is_admin:
            raise PermissionDenied('You do not have permission to edit this card.')

        card.expires_at = validated_data.get('expires_at')
        card.save()
        return card


class TicketService:
    @staticmethod
    def create_ticket(owner):
        return create_ticket_for_user(owner)
