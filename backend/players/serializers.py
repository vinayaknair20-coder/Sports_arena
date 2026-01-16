from rest_framework import serializers
from .models import PlayerProfile
from accounts.serializers import UserSerializer

class PlayerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = PlayerProfile
        fields = '__all__'
