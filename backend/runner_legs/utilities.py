from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404
from .models import RunnerLeg
from .serializers import RunnerLegSerializer


def calculate_leg_end_time(start_datetime, pace, distance):
    time_per_mile = timedelta(minutes=pace.minute, seconds=pace.second)
    leg_duration = timedelta(seconds=(distance * time_per_mile.total_seconds()))
    return start_datetime + leg_duration

def reset_leg_times(leg_id, start_datetime):
    runner_leg = get_object_or_404(RunnerLeg, id=leg_id)
    end_datetime = calculate_leg_end_time(start_datetime, runner_leg.runner.runner_pace, float(runner_leg.race_leg.leg_distance))
    serializer = RunnerLegSerializer(runner_leg, data={'runner_leg_start': start_datetime, 'runner_leg_end': end_datetime}, partial=True)
    if serializer.is_valid():
        serializer.save()
    return end_datetime

def update_exchanged_legs(completed_leg_id, current_leg_id, exchange_datetime):
    completed_leg = get_object_or_404(RunnerLeg, id=completed_leg_id)
    completed_serializer = RunnerLegSerializer(completed_leg, data={'is_completed': True, 'is_in_progress': False, 'runner_leg_end': exchange_datetime}, partial=True)
    if completed_serializer.is_valid():
        completed_serializer.save()
    current_leg = get_object_or_404(RunnerLeg, id=current_leg_id)
    current_serializer = RunnerLegSerializer(current_leg, data={'is_in_progress': True}, partial=True)
    if current_serializer.is_valid():
        current_serializer.save()