"""hl URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from home import views
urlpatterns = [
    path('login', views.loginuser, name='login'),
    path('logout', views.logoutuser, name='logout'),
    path('', views.home, name='home'),
    path('chat/<person>', views.chat, name='chat'),
    path('chatmn/<person>/<noofmessages>', views.chatmn, name='chatmn'),
    path('create', views.create, name='create'),
    path('forgot', views.forgot, name='forgot'),
    path('new', views.new, name='new'),
]
