# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parse', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='API_DATA',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('service_request_id', models.CharField(max_length=100)),
                ('requested_datetime', models.DateTimeField()),
                ('status', models.CharField(max_length=100)),
                ('keyword', models.TextField(blank=True)),
                ('area', models.CharField(max_length=100)),
                ('service_name', models.CharField(max_length=100)),
                ('subproject', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('address_string', models.CharField(max_length=100)),
                ('lat', models.CharField(max_length=100)),
                ('lng', models.CharField(max_length=100)),
                ('service_notice', models.TextField(blank=True)),
                ('updated_datetime', models.DateTimeField()),
                ('expected_datetime', models.DateTimeField()),
            ],
        ),
    ]
