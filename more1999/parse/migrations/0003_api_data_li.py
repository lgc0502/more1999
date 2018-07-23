# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parse', '0002_api_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='api_data',
            name='li',
            field=models.CharField(default='none', max_length=100),
            preserve_default=False,
        ),
    ]
