
from django.contrib import admin
from django.urls import path, include, re_path
from library.views import search_by_isbn

urlpatterns = [
    re_path('', search_by_isbn, name='search_by_isbn'),
]
