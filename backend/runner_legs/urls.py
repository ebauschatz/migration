from django.urls import path
from . import views

urlpatterns = [
    path('new/', views.create_runner_leg),
    path('runner/<int:runner_id>/', views.get_all_legs_for_runner),
    path('team/<int:team_id>/', views.get_all_legs_for_team),
    path('unassigned/<int:team_id>/', views.get_unassigned_team_legs),
    path('<int:runner_leg_id>/', views.update_runner_leg),
]