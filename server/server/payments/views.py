import os
import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model

stripe.api_key = ""
User = get_user_model()

class CreateFundSession(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        user = request.user
        amount = request.data.get("amount")

        if not amount:
            return Response({"error": "Amount is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': int(amount) * 100,
                        'product_data': {
                            'name': f"Fund Account - ${amount}"
                        },
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url='http://localhost:5173/payment-success',
                cancel_url='http://localhost:5173/add-funds',
                metadata={
                    "user_id": str(user.id),
                    "amount": str(amount)
                }
            )

            return Response({"sessionUrl": session.url})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)