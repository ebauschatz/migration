from rest_framework import serializers
from .models import Race

class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Race
        fields = ['id', 'race_name', 'race_start_date', 'race_finish_opens', 'race_finish_closes', 'race_start_place_id']