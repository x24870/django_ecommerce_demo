# Generated by Django 3.0.11 on 2020-12-13 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='city',
            field=models.CharField(default='Defualt city', max_length=200),
            preserve_default=False,
        ),
    ]
