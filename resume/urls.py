from django.urls import path
from .views import APIAll

urlpatterns = [
    path('resume', APIAll.as_view(), name='api_all')
]
