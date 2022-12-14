from django.urls import path
from . import views

urlpatterns = [
    path('team/<int:team_id>/', views.get_runners_for_team),
    path('user/<int:user_id>/', views.get_runners_for_user),
    path('new/', views.create_runner),
    path('<int:runner_id>/', views.single_runner),
    path('team/new/', views.create_team_and_runner),
]