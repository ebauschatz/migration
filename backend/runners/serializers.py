from rest_framework import serializers
from .models import Runner

class RunnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Runner
        fields = ['id', 'runner_pace', 'user', 'team', 'team_role', 'user_id', 'team_id', 'team_role_id']
        depth = 2

    user_id = serializers.IntegerField(write_only=True)
    team_id = serializers.IntegerField(write_only=True)
    team_role_id  = serializers.IntegerField(write_only=True)