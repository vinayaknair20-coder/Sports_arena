from rest_framework import serializers
from .models import Turf, Booking
from accounts.serializers import UserSerializer
from decimal import Decimal

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
        read_only_fields = ('user', 'total_price', 'status', 'created_at')

    def validate(self, attrs):
        turf = attrs.get('turf') or getattr(self.instance, 'turf', None)
        date = attrs.get('date') or getattr(self.instance, 'date', None)
        start_time = attrs.get('start_time') or getattr(self.instance, 'start_time', None)
        end_time = attrs.get('end_time') or getattr(self.instance, 'end_time', None)

        if start_time and end_time and start_time >= end_time:
            raise serializers.ValidationError('End time must be after start time.')

        if turf and start_time and end_time:
            if start_time < turf.available_from or end_time > turf.available_to:
                raise serializers.ValidationError('Selected time is outside this turf availability.')

        if turf and date and start_time and end_time:
            overlap = Booking.objects.filter(
                turf=turf,
                date=date,
                start_time__lt=end_time,
                end_time__gt=start_time,
            ).exclude(status='cancelled')

            if self.instance:
                overlap = overlap.exclude(pk=self.instance.pk)

            if overlap.exists():
                raise serializers.ValidationError('This slot is already booked.')

        return attrs

    def create(self, validated_data):
        turf = validated_data['turf']
        start_time = validated_data['start_time']
        end_time = validated_data['end_time']
        start_minutes = start_time.hour * 60 + start_time.minute
        end_minutes = end_time.hour * 60 + end_time.minute
        hours = Decimal(end_minutes - start_minutes) / Decimal(60)
        validated_data['total_price'] = turf.price_per_hour * hours
        validated_data['status'] = 'confirmed'
        return super().create(validated_data)
