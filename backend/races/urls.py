from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.get_all_races),
    path('new/', views.create_new_race),
    path('<int:race_id>/', views.single_race),
]