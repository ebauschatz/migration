# Generated by Django 4.1.3 on 2022-11-21 16:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('runners', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='runner',
            old_name='team_id',
            new_name='team',
        ),
        migrations.RenameField(
            model_name='runner',
            old_name='team_role_id',
            new_name='team_role',
        ),
        migrations.RenameField(
            model_name='runner',
            old_name='user_id',
            new_name='user',
        ),
    ]
