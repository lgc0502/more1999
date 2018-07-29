# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parse', '0007_unfinish'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='unfinish',
            name='address_string',
        ),
        migrations.RemoveField(
            model_name='unfinish',
            name='area',
        ),
        migrations.RemoveField(
            model_name='unfinish',
            name='service_name',
        ),
        migrations.RemoveField(
            model_name='unfinish',
            name='subproject',
        ),
    ]
