from django.db import models
from races.models import Race

class RaceLeg(models.Model):
    race = models.ForeignKey(Race, on_delete=models.CASCADE)
    leg_number = models.IntegerField()
    leg_distance = models.DecimalField(max_digits=5, decimal_places=2)
    leg_end_place_id = models.CharField(max_length=500)