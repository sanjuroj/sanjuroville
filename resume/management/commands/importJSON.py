from django.core.management.base import BaseCommand
import importlib
import os
from os.path import isfile
import csv
import datetime
import sys
import re
import json
from titlecase import titlecase
from collections import defaultdict

from resume.models import (Job, JobHighlight, Education, EducationHighlight, Volunteer, VolunteerHighlight,
    Language, Basics, Profile, Skill)


class Command(BaseCommand):

    help = "Import data exported from a JSON dump"

    def add_arguments(self, parser):
        parser.add_argument('resource')

    def handle(self, *args, **options):


        if not os.path.isfile(options['resource']):
            print("ERROR: couldn't find {}".format(options['resource']))


        importMap = {
            'resume.profile': Profile,
            'resume.basics': Basics,
            'resume.education': Education,
            'resume.educationhighlight': EducationHighlight,
            'resume.job': Job,
            'resume.jobhighlight': JobHighlight,
            'resume.volunteer': Volunteer,
            'resume.volunteerhighlight': VolunteerHighlight,
            'resume.language': Language,
            'resume.skill': Skill,
        }

        pks = defaultdict(dict)

        # model_names = set()
        with open(options['resource'], 'r') as fh:
            data = json.loads(fh.read())
            highlights_for_later = []
            for entry in data:
                if 'resume' not in entry['model']:
                    continue
                if 'highlight' in entry['model']:
                    highlights_for_later.append(entry)
                    continue
                # model_names.add(entry['model'])
                print('line: {}'.format(entry))
                model_class = importMap[entry['model']]
                model_obj = model_class()
                for key, value in entry['fields'].items():
                    setattr(model_obj, key, value)
                model_obj.save()
                pks[model_class.__name__.lower()][entry['pk']] = model_obj.pk

                highlight_map = {
                    'resume.jobhighlight': Job,
                    'resume.volunteerhighlight': Volunteer,
                    'resume.educationhighlight': Education,
                }

            for entry in highlights_for_later:
                print('highlight entry', entry)
                model_obj = importMap[entry['model']]()
                print('line: {}'.format(entry))
                parent_class = highlight_map[entry['model']]
                model_name = parent_class.__name__.lower()
                for key, value in entry['fields'].items():
                    if key == model_name:
                        parent = parent_class.objects.get(pk=pks[model_name][value])
                        setattr(model_obj, key, parent)
                    else:
                        setattr(model_obj, key, value)
                    print('lc root ', (Job.__name__.lower()))
                    print('parent model', parent_class)

                model_obj.save()

        # print('model names: {}'.format(model_names))


    def processJSON(self, filePath, modelName):
            # print('file, model=', filePath, model)
            fieldMap = self.fieldMaps[modelName]
            Model = getattr(importlib.import_module('resume.models'), modelName)
            with open(filePath, 'r') as fh:
                attrDict = {}
                csvReader = csv.DictReader(fh)
                for row in csvReader:
                    fieldMap = self.fieldMaps[modelName]
                    highlightFields = []
                    for key in row:
                        if fieldMap[key] == 'highlights':
                            highlightFields.append(key)
                        elif modelName == 'Language' and key == 'Proficiency':
                            attrDict[fieldMap[key]] = self.langConvert(row[key])
                        elif key == 'Start Date' or key == 'End Date':
                            dateVal, precision = self.dateConvert(row[key])
                            attrDict[fieldMap[key]] = dateVal
                            attrDict[fieldMap[key] + 'Precision'] = precision
                        else:
                            attrDict[fieldMap[key]] = row[key]
                    #print('attrdict=', attrDict)
                    modInst = Model(**attrDict)
                    #print('modinst', modInst)
                    modInst.save()
                    for key in highlightFields:
                        if len(row[key]) > 2:
                            self.storeHighlights(modelName, row[key], modInst)
                    

    def storeHighlights(self, modelName, hText, modelInst):
        
        highlights = re.split(r'\n+', hText)
        highlights = [line.strip() for line in highlights]
        hModel = getattr(importlib.import_module('resume.models'), modelName + 'Highlight')
        for hl in highlights:
            match = re.search(r'^\s*$', hl)
            if match != None:
                continue
            attr = {'highlight': hl}
            attr[modelName.lower()] = modelInst
            newH = hModel(**attr)
            newH.save()


    def dateConvert(self, dateString):
        #print('match groups', match.groups)
        if len(dateString) == 4:
            return (datetime.date(int(dateString),1,1), 'y')
        else:
            (month, year) = dateString.split('/')
            return(datetime.date(int(year), int(month),1), 'm')

    def langConvert(self, levelText):
        if 'NATIVE' in levelText:
            return 'Native'
        else:
            return titlecase(levelText)



    fieldMaps = {
        'Job': {
            'Company Name': 'company',
            'End Date': 'endDate', 
            'Start Date': 'startDate',
            'Location': 'location', 
            'Title': 'position', 
            'Description': 'highlights', 
        },
        'Education': {
            'School Name': 'institution',
            'Start Date': 'startDate',
            'End Date': 'endDate',
            'Notes': 'highlights',
            'Degree Name': 'major',
            'Activities': 'highlights'
        },
        'Skill': {
            'Skill Name': 'name'
        },
        'Basics': {
            'First Name': 'name',
            'Headline': 'label',
            'Summary': 'summary',
        },
        'Language': {
            'Name': 'name',
            'Proficiency': 'level'
        }

    }


