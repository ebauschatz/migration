from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import RunnerLeg
from .serializers import RunnerLegSerializer
from runners.models import Runner
from race_legs.models import RaceLeg
from datetime import datetime, timedelta
from .utilities import calculate_leg_end_time

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_legs_for_runner(request, runner_id):
    runner_legs = RunnerLeg.objects.filter(runner_id=runner_id)
    serializer = RunnerLegSerializer(runner_legs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_runner_leg(request):
    runner = get_object_or_404(Runner, id=request.data["runner_id"])
    start_datetime = datetime.strptime(request.data["runner_leg_start"], '%Y-%m-%d %H:%M:%S')
    race_leg = get_object_or_404(RaceLeg, id=request.data["race_leg_id"])
    request.data["runner_leg_end"] = calculate_leg_end_time(start_datetime, runner.runner_pace, float(race_leg.leg_distance))
    serializer = RunnerLegSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)