from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Team
from .serializers import TeamSerializer
from runner_legs.models import RunnerLeg
from runner_legs.serializers import RunnerLegSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def teams_for_race(request, race_id):
    teams = Team.objects.filter(race_id=race_id)
    serializer = TeamSerializer(teams, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_team(request):
    serializer = TeamSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def single_team(request, team_id):
    team = get_object_or_404(Team, id=team_id)
    if (request.method == 'PUT'):
        serializer = TeamSerializer(team, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if (request.method == 'DELETE'):
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    if (request.method == 'GET'):
        serializer = TeamSerializer(team)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def begin_race(request, team_id):
    team = get_object_or_404(Team, id=team_id)
    team_serializer = TeamSerializer(team, data=request.data, partial=True)
    if team_serializer.is_valid():
        team_serializer.save()
        runner_leg = get_object_or_404(RunnerLeg, id=request.data['runner_leg_id'])
        runner_leg_serializer = RunnerLegSerializer(runner_leg, data={'is_in_progress': True, 'runner_leg_start': request.data['team_start']}, partial=True)
        if runner_leg_serializer.is_valid():
            runner_leg_serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)