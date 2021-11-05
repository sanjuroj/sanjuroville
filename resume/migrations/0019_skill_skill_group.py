# Generated by Django 3.2.6 on 2021-11-01 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0018_auto_20211031_2025'),
    ]

    operations = [
        migrations.AddField(
            model_name='skill',
            name='skill_group',
            field=models.CharField(choices=[('languages', 'Languages'), ('frameworks', 'Frameworks/CMS'), ('databases', 'Databases'), ('data_analysis', 'Data Analysis'), ('server', 'Server/Dev Ops'), ('other', 'Other')], max_length=255, null=True),
        ),
    ]