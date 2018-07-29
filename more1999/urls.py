"""more1999 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from parse.views import hello_world, village_visualization, Donut_chart, test1,test2,test3,test4,test5,test6,test7,test8


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', hello_world),
    url(r'^village_visualization/$', village_visualization),
    url(r'^Donut/$', Donut_chart),
    url(r'^test1/$', test1),
    url(r'^test2/$', test2),
    url(r'^test3/$', test3),
    url(r'^test4/$', test4),
    url(r'^test5/$', test5),
    url(r'^test6/$', test6),
    url(r'^test7/$', test7),
    url(r'^test8/$', test8),

]
