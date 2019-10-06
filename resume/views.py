import importlib
from django.shortcuts import render
from .models import *

from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class ExpandedModelSerializer(serializers.ModelSerializer):

    def get_field_names(self, declared_fields, info):
        base_fields = set(super(ExpandedModelSerializer, self).get_field_names(declared_fields, info))

        extra_fields = getattr(self.Meta, 'extra_fields', set())
        exclude_fields = getattr(self.Meta, 'exclude_fields', set())
        # print('filed list', list(((base_fields | extra_fields)) - exclude_fields))
        return list((((base_fields | extra_fields)) - exclude_fields))


class APIAll (APIView):

    titles = {
        'Job': 'Work Experience',
        'Volunteer': 'Volunteering',
        'Skill': 'Skills',
        'Language': 'Languages'
    }

    def serializer_factory(self, model_name, highlights_model_name):
        # print('mname=', modelName)
        models_module = importlib.import_module('.models', 'resume')
        main_model = getattr(models_module, model_name)

        highlights_model = None
        if highlights_model_name:
            highlights_model = getattr(models_module, highlights_model_name)

        class HighlightSerializer(ExpandedModelSerializer):
            class Meta:
                model = highlights_model
                fields = ['highlight']


        class MainSerializer(ExpandedModelSerializer):
            if highlights_model_name:
                highlights = HighlightSerializer(many=True)
            else:
                highlights = None

            class Meta:
                model = main_model
                fields = '__all__'
                exclude_fields = {'id'}

        return MainSerializer(main_model.objects.all(), many=True)

    def get(self, request):

        categories = [
            ('Job', 'JobHighlight'),
            ('Education', 'EducationHighlight'),
            ('Volunteer', 'VolunteerHighlight'),
            ('Basics', None),
            ('Skill', None),
            ('Language', None)
        ]

        responseArray = dict()

        for model, highlight_model in categories:
            # print(type(cat))
            # print(serializer.__repr__())
            serializer = self.serializer_factory(model, highlight_model)

            responseArray[model.lower()] = serializer.data

        return Response(responseArray)
