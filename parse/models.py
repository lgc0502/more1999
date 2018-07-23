from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    photo = models.URLField(blank=True)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
class API_DATA(models.Model):
    service_request_id = models.CharField(max_length=100)
    requested_datetime = models.DateTimeField(auto_now_add=False)
    status = models.CharField(max_length=100)
    keyword = models.TextField(blank=True)
    area = models.CharField(max_length=100)
    li = models.CharField(max_length=100)
    service_name = models.CharField(max_length=100)
    subproject = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    address_string = models.CharField(max_length=100)
    lat = models.CharField(max_length=100)
    lng = models.CharField(max_length=100)
    service_notice = models.TextField(blank=True)
    updated_datetime = models.DateTimeField(auto_now_add=False)
    expected_datetime = models.DateTimeField(auto_now_add=False)
   