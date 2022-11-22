from datetime import datetime, timedelta

def calculate_leg_end_time(start_datetime, pace, distance):
    time_per_mile = timedelta(minutes=pace.minute, seconds=pace.second)
    leg_duration = timedelta(seconds=(distance * time_per_mile.total_seconds()))
    return start_datetime + leg_duration