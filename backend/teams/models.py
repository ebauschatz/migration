from django.db import models
from races.models import Race

class Team(models.Model):
    race = models.ForeignKey(Race, on_delete=models.CASCADE)
    team_name = models.CharField(max_length=500)
    team_start = models.DateTimeField()
    team_end = models.DateTimeField()