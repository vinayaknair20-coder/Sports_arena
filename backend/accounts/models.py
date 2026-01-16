from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ADMIN = 'admin'
    TURF_OWNER = 'turf_owner'
    SHOP_OWNER = 'shop_owner'
    TOURNAMENT_HOST = 'tournament_host'
    PLAYER = 'player'
    USER = 'user'

    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (TURF_OWNER, 'Turf Owner'),
        (SHOP_OWNER, 'Shop Owner'),
        (TOURNAMENT_HOST, 'Tournament Host'),
        (PLAYER, 'Player'),
        (USER, 'User'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=USER)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
