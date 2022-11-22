from django.db import models
from runners.models import Runner
from race_legs.models import RaceLeg

class RunnerLeg(models.Model):
    runner = models.ForeignKey(Runner, on_delete=models.CASCADE)
    race_leg = models.ForeignKey(RaceLeg, on_delete=models.CASCADE)
    runner_leg_start = models.DateTimeField()
    runner_leg_end = models.DateTimeField()
    is_completed = models.BooleanField(default=False)
    is_in_progress = models.BooleanField(default=False)