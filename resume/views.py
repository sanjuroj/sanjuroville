import importlib
from django.shortcuts import render
from .models import *

from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class APIAll (APIView):

    titles = {
        'Job': 'Work Experience',
        'Volunteer': 'Volunteering',
        'Skill': 'Skills',
        'Language': 'Languages'
    }

    def makeSerializer(self, modelName, highlightName=None):
        # print('mname=', modelName)
        modelsModule = importlib.import_module('.models', 'resume')
        modelObj = getattr(modelsModule, modelName)

        class TempSerializer(serializers.ModelSerializer):

            if highlightName is not None:
                highlights = serializers.StringRelatedField(many=True)

            if modelName in self.titles:
                title = self.titles[modelName]
            else:
                title = modelName

            class Meta:
                model = modelObj

        return TempSerializer(modelObj.objects.all(), many=True)

    def get(self, request):

        categories = [
            ('Job', 'JobHighlight'),
            ('Education', 'EducationHighlight'),
            ('Volunteer', 'VolunteerHighlight'),
            'Basics',
            'Skill',
            'Language',
        ]

        responseArray = dict()

        for cat in categories:
            # print(type(cat))
            # print(serializer.__repr__())
            if len(cat) == 2:
                modelName = cat[0]
                serializer = self.makeSerializer(cat[0], cat[1])
            else:
                modelName = cat
                serializer = self.makeSerializer(modelName)
            responseArray[modelName.lower()] = serializer.data

        return Response(responseArray)
