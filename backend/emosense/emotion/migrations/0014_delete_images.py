# Generated by Django 5.0.2 on 2024-02-14 16:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("emotion", "0013_users_age_users_gender_users_phone"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Images",
        ),
    ]
