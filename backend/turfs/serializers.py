from rest_framework import serializers
from .models import Turf, Booking
from accounts.serializers import UserSerializer

class TurfSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Turf
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    turf_details = TurfSerializer(source='turf', read_only=True)
    class Meta:
        model = Booking
        fields = '__all__'
