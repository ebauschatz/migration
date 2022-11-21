from django.db import models
from authentication.models import User
from teams.models import Team
from team_roles.models import TeamRole

class Runner(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    runner_pace = models.TimeField()
    team_role = models.ForeignKey(TeamRole, on_delete=models.CASCADE)