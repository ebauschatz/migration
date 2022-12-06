from rest_framework import serializers
from .models import RaceLeg

class RaceLegSerializer(serializers.ModelSerializer):
    class Meta:
        model = RaceLeg
        fields = ['id', 'leg_number', 'leg_distance', 'leg_end_place_id', 'leg_end_address', 'leg_end_city', 'leg_end_state', 'leg_end_zip', 'race', 'race_id']
        depth = 1

    race_id = serializers.IntegerField(write_only=True)