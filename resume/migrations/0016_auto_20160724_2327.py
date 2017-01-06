# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-07-25 06:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0015_auto_20160723_0050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='educationhighlight',
            name='highlight',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='volunteer',
            name='summary',
            field=models.TextField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='volunteerhighlight',
            name='highlight',
            field=models.TextField(),
        ),
    ]
