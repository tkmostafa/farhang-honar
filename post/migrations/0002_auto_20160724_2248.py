# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-24 18:18
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AlterOrderWithRespectTo(
            name='tag',
            order_with_respect_to='name',
        ),
    ]