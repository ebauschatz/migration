from django.urls import path
from . import views

urlpatterns = [
    path('race/<int:race_id>/', views.teams_for_race),
    path('new/', views.create_team),
    path('<int:team_id>/', views.single_team),
    path('begin/<int:team_id>/', views.begin_race),
    path('recalculate/<int:team_id>/', views.recalculate_exchanges),
    path('exchange/<int:team_id>/', views.exchange_runners),
]