# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-03 14:52
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0003_auto_20160503_0749'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Courses',
            new_name='Course',
        ),
    ]
