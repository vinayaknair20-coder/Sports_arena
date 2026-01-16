from django.db import models
from django.conf import settings
from turfs.models import Turf

class Tournament(models.Model):
    host = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='hosted_tournaments')
    name = models.CharField(max_length=255)
    description = models.TextField()
    sport_type = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    registration_fee = models.DecimalField(max_digits=10, decimal_places=2)
    turf = models.ForeignKey(Turf, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('upcoming', 'Upcoming'), ('ongoing', 'Ongoing'), ('completed', 'Completed')], default='upcoming')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Team(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='teams')
    name = models.CharField(max_length=255)
    players = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='teams')

    def __str__(self):
        return self.name

class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches')
    team_a = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='matches_as_a')
    team_b = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='matches_as_b')
    date_time = models.DateTimeField()
    score_a = models.IntegerField(default=0)
    score_b = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=[('scheduled', 'Scheduled'), ('live', 'Live'), ('finished', 'Finished')], default='scheduled')

    def __str__(self):
        return f"{self.team_a} vs {self.team_b} - {self.tournament.name}"
