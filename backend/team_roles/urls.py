from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.get_all_team_roles),
    path('new/', views.create_new_team_role),
    path('<int:team_role_id>/', views.single_team_role),
]