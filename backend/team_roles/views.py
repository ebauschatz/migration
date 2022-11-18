from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import TeamRole
from .serializers import TeamRoleSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_team_roles(request):
    team_roles = TeamRole.objects.all()
    serializer = TeamRoleSerializer(team_roles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_new_team_role(request):
    serializer = TeamRoleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE', 'GET'])
@permission_classes([IsAuthenticated])
def single_team_role(request, team_role_id):
    team_role = get_object_or_404(TeamRole, id=team_role_id)
    if (request.method == 'PUT'):
        serializer = TeamRoleSerializer(team_role, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if (request.method == 'DELETE'):
        team_role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    if (request.method == 'GET'):
        serializer = TeamRoleSerializer(team_role)
        return Response(serializer.data, status=status.HTTP_200_OK)