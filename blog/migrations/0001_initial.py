# Generated by Django 5.0.2 on 2024-03-02 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.EmailField(max_length=250)),
                ('title', models.CharField(max_length=250)),
                ('content', models.TextField()),
            ],
        ),
    ]