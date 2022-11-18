from rest_framework import serializers
from .models import TeamRole

class TeamRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamRole
        fields = ['id', 'role_name']