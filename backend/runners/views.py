from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Runner
from .serializers import RunnerSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_runners_for_team(request, team_id):
    runners = Runner.objects.filter(team_id=team_id)
    serializer = RunnerSerializer(runners, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_runners_for_user(request, user_id):
    runners = Runner.objects.filter(user_id=user_id)
    serializer = RunnerSerializer(runners, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_runner(request):
    serializer = RunnerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def single_runner(request, runner_id):
    runner = get_object_or_404(Runner, id=runner_id)
    if (request.method == 'PUT'):
        serializer = RunnerSerializer(runner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if (request.method == 'DELETE'):
        runner.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    if (request.method == 'GET'):
        serializer = RunnerSerializer(runner)
        return Response(serializer.data, status=status.HTTP_200_OK)