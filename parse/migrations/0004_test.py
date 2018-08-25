# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parse', '0003_api_data_li'),
    ]

    operations = [
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('service_request_id', models.CharField(max_length=100)),
                ('requested_datetime', models.DateTimeField()),
                ('status', models.CharField(max_length=100)),
                ('area', models.CharField(max_length=100)),
                ('li', models.CharField(max_length=100)),
                ('service_name', models.CharField(max_length=100)),
                ('subproject', models.CharField(max_length=100)),
                ('address_string', models.CharField(max_length=100)),
                ('lat', models.CharField(max_length=100)),
                ('lng', models.CharField(max_length=100)),
                ('updated_datetime', models.DateTimeField()),
                ('expected_datetime', models.DateTimeField()),
            ],
        ),
    ]
