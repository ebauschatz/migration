from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Race
from .serializers import RaceSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_races(request):
    races = Race.objects.all()
    serializer = RaceSerializer(races, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_new_race(request):
    serializer = RaceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE', 'GET'])
@permission_classes([IsAuthenticated])
def single_race(request, race_id):
    race = get_object_or_404(Race, id=race_id)
    if (request.method == 'PUT'):
        serializer = RaceSerializer(race, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if (request.method == 'DELETE'):
        race.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    if (request.method == 'GET'):
        serializer = RaceSerializer(race)
        return Response(serializer.data, status=status.HTTP_200_OK)