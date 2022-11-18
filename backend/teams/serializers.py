from rest_framework import serializers
from .models import Team

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'team_name', 'team_start', 'team_end', 'race', 'race_id']
        depth = 1

    race_id = serializers.IntegerField(write_only=True)