from django.urls import path
from . import views

urlpatterns = [
    path('race/<int:race_id>/', views.legs_for_race),
    path('new/', views.create_leg),
    path('<int:race_leg_id>/', views.single_leg),
]