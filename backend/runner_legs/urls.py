from django.urls import path
from . import views

urlpatterns = [
    path('runner/<int:runner_id>/', views.get_all_legs_for_runner),
    path('new/', views.create_runner_leg),
]