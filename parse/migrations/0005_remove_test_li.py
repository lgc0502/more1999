# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parse', '0004_test'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='test',
            name='li',
        ),
    ]
