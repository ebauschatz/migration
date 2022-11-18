from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import RaceLeg
from .serializers import RaceLegSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def legs_for_race(request, race_id):
    race_legs = RaceLeg.objects.filter(race_id=race_id)
    serializer = RaceLegSerializer(race_legs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_leg(request):
    serializer = RaceLegSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def single_leg(request, race_leg_id):
    race_leg = get_object_or_404(RaceLeg, id=race_leg_id)
    if (request.method == 'PUT'):
        serializer = RaceLegSerializer(race_leg, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if (request.method == 'DELETE'):
        race_leg.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    if (request.method == 'GET'):
        serializer = RaceLegSerializer(race_leg)
        return Response(serializer.data, status=status.HTTP_200_OK)