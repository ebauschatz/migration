from rest_framework import serializers
from .models import RunnerLeg

class RunnerLegSerializer(serializers.ModelSerializer):
    class Meta:
        model = RunnerLeg
        fields = ['id', 'runner_leg_start', 'runner_leg_end', 'is_completed', 'is_in_progress', 'runner', 'race_leg', 'runner_id', 'race_leg_id']
        depth = 2

    runner_id = serializers.IntegerField(write_only=True)
    race_leg_id = serializers.IntegerField(write_only=True)