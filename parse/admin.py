from django.contrib import admin

# Register your models here.
from .models import Post
from .models import API_DATA
from .models import Test
from .models import Unfinish

admin.site.register(Post)
admin.site.register(API_DATA)
admin.site.register(Test)
admin.site.register(Unfinish)