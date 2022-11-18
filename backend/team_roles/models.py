from django.db import models

class TeamRole(models.Model):
    role_name = models.CharField(max_length=255)