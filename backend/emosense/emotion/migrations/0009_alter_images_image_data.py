# Generated by Django 5.0.2 on 2024-02-09 05:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emotion', '0008_alter_images_image_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='images',
            name='image_data',
            field=models.TextField(max_length=168),
        ),
    ]
