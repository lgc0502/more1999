# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parse', '0006_auto_20180726_1204'),
    ]

    operations = [
        migrations.CreateModel(
            name='Unfinish',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('service_request_id', models.CharField(max_length=100)),
                ('requested_datetime', models.DateTimeField()),
                ('status', models.CharField(max_length=100)),
                ('area', models.CharField(max_length=100)),
                ('service_name', models.CharField(max_length=100)),
                ('subproject', models.CharField(max_length=100)),
                ('address_string', models.CharField(max_length=100)),
                ('updated_datetime', models.DateTimeField()),
                ('expected_datetime', models.DateTimeField()),
            ],
        ),
    ]
