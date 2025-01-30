from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(
        UserModel,
        on_delete=models.CASCADE,
        related_name='profile'
    )

    profile_image = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    ucn = models.CharField(max_length=10)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    STATUS_CHOICES = [
        ('student', 'Student'),
        ('disabilities', 'With Disabilities'),
        ('worker', 'Worker'),
        ('retiree', 'Retiree'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='worker')

    document = models.FileField(upload_to='documents/', blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.status}"
