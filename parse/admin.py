from django.contrib import admin

# Register your models here.
from .models import Post
from .models import API_DATA

admin.site.register(Post)
admin.site.register(API_DATA)