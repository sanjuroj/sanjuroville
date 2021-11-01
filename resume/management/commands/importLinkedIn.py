from django.core.management.base import BaseCommand
import importlib
import os
from os.path import isfile
import csv
import datetime
import sys
import re
from titlecase import titlecase


class Command(BaseCommand):

    help = "Import data exported from LinkedIn"

    def add_arguments(self, parser):
        parser.add_argument('resource')

    def handle(self, *args, **options):
        resource = options['resource']
        fileList = []
        if os.path.isfile(resource):
            fileList.append(resource)
            basePath = os.path.dirname(resource)
        elif os.path.isdir(resource):
            fileList = [file for file in os.listdir(resource) if isfile(os.path.join(resource,file))]
            basePath = resource
        else:
            print("ERROR: resource must be either a file or a directory")

        importMap = {
            'Positions.csv': 'Job',
            'Education.csv': 'Education',
            'Skills.csv': 'Skill',
            'Proile.csv': 'Basics',
            'Languages.csv': 'Language'
        }

        for f in fileList:
            if f in importMap:
                self.processCSV(os.path.join(basePath, f), importMap[f])

    def processCSV(self, filePath, modelName):
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
                    modInst = Model(**attrDict)
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


