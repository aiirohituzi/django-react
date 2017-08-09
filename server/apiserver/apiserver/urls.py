"""apiserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from posting import views
from rest_framework import routers

from rest_framework.routers import DefaultRouter

from posting.views import login_user
from posting.views import uploadPost
from posting.views import updatePost
from posting.views import deletePost
from posting.views import uploadImage
from posting.views import getImageByPostId
# from posting.views import my_image
# from posting.views import test


router = DefaultRouter()
router.register(r'posting', views.PostingViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^upload/$', uploadPost, name='upload'),
    url(r'^update/$', updatePost, name='update'),
    url(r'^delete/$', deletePost, name='delete'),
    url(r'^upImage/$', uploadImage, name='upImage'),
    url(r'^login/$', login_user, name='login'),
    url(r'^images/$', getImageByPostId, name='images'),
    # url(r'^myimage/$', my_image, name='myimages'),
    # url(r'^test/$', test, name='test'),
]