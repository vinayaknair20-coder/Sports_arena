from rest_framework import serializers
from .models import Tournament, Team, Match
from accounts.serializers import UserSerializer
from turfs.serializers import TurfSerializer

class TeamSerializer(serializers.ModelSerializer):
    players = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Team
        fields = '__all__'

class MatchSerializer(serializers.ModelSerializer):
    team_a_details = TeamSerializer(source='team_a', read_only=True)
    team_b_details = TeamSerializer(source='team_b', read_only=True)
    class Meta:
        model = Match
        fields = '__all__'

class TournamentSerializer(serializers.ModelSerializer):
    host = UserSerializer(read_only=True)
    turf_details = TurfSerializer(source='turf', read_only=True)
    teams = TeamSerializer(many=True, read_only=True)
    matches = MatchSerializer(many=True, read_only=True)
    class Meta:
        model = Tournament
        fields = '__all__'
