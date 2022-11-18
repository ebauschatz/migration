from django.urls import path
from . import views

urlpatterns = [
    path('race/<int:race_id>/', views.teams_for_race),
    path('new/', views.create_team),
    path('<int:team_id>/', views.single_team),
]