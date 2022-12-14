from django.db import models

class Race(models.Model):
    race_name = models.CharField(max_length=500)
    race_start_date = models.DateField()
    race_finish_opens = models.DateTimeField()
    race_finish_closes = models.DateTimeField()
    race_start_place_id = models.CharField(max_length=500)
    race_start_address = models.CharField(max_length=100)
    race_start_city = models.CharField(max_length=100)
    race_start_state = models.CharField(max_length=2)
    race_start_zip = models.CharField(max_length=11)