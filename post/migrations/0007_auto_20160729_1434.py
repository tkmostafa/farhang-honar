# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-29 10:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0006_auto_20160725_2345'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subgroup',
            name='group',
        ),
        migrations.AddField(
            model_name='group',
            name='subs',
            field=models.ManyToManyField(blank=True, to='post.subgroup'),
        ),
    ]