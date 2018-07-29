# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parse', '0005_remove_test_li'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='test',
            name='lat',
        ),
        migrations.RemoveField(
            model_name='test',
            name='lng',
        ),
    ]
