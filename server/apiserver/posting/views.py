from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from posting.models import Posting
from posting.serializers import PostingSerializer
from posting.serializers import UserSerializer

from django.contrib.auth.models import User
from rest_framework.reverse import reverse
from rest_framework import viewsets

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from posting.forms import PostForm
import json

from django.contrib.auth import models

from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth.hashers import check_password

# Create your views here.
class PostingViewSet(viewsets.ModelViewSet):  
    queryset = Posting.objects.all().order_by('-id')
    serializer_class = PostingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet): 
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(('GET',))
def api_root(request, format=None):  
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'posting': reverse('posting-list', request=request, format=format)
    })

@csrf_exempt
def uploadPost(request):
    result = False

    form = PostForm(request.POST)
    row = models.User.objects.get(username=request.POST['user'])

    # print(row.username)

    if form.is_valid():
        obj = form.save(commit=False)      # true일 경우 바로 데이터베이스에 적용, 현재 유저정보가 담기지 않았기에 not null 제약조건에 걸려 작업이 실패하므로 false
        obj.owner_id = row.id
        obj.save()      # obj.save(commit=True) 와 동일
        print("Create Post Request : Post success")
        result = True
    else:
        print("Create Post Request : Post error")

    # print(request.POST['user'])
    # print(type(request.user))
    # print(json.dumps(request.POST))
    return HttpResponse(result)

@csrf_exempt
def deletePost(request):
    # userInfo = User.objects.get(username=request.POST['user'])
    # username = request.POST['user']
    # password = request.POST['password']

    data = json.loads(request.body)
    postId = data['postId']
    username = data['user']
    password = data['password']

    login_valid = (settings.ADMIN_LOGIN == username)
    pwd_valid = check_password(password, settings.ADMIN_PASSWORD)

    # print(login_valid)
    # print(pwd_valid)

    if not login_valid and pwd_valid:
        return HttpResponse(False)

    result = False
    log = ''

    try:
        row = Posting.objects.get(id=postId)
    except Posting.DoesNotExist:
        print("Delete Post Request : [Failed]No Posting matches the given query.")
        return HttpResponse(result)
    
    if row != None:
        log += 'Delete Post Request : post ' + str(row.id) + ' delete success'
        print(log)
        row.delete()
        result = True
    else:
        print("Delete Post Request : Delete error")

    return HttpResponse(result)

@csrf_exempt
def login(request):
    # print(json.loads(request.body))
    print('Admin Login Request...')

    # username = request.POST.get('user', False)
    # password = request.POST.get('password', False)
    # Postman에서 Post요청할 경우엔 통용되지만 axios를 통해 Post요청 시엔 불통
    # 직렬화 관련 문제인듯, 양측의 request.body에 담기는 데이터 자체가 다르다.
    # Postman :
    # b'----------------------------418318425319320142162885\r\nContent-Disposition: form-data; name="user"\r\n\r\nadmin\r\n----------------------------418318425319320142162885\r\nContent-Disposition: form-data; name="password"\r\n\r\nasdf1234\r\n----------------------------418318425319320142162885--\r\n'
    # axios :
    # b'{"user":"admin","password":"asdf1234"}'

    data = json.loads(request.body)
    username = data['user']
    password = data['password']

    # print('ID : ' + username)
    # print('PW : ' + password)

    login_valid = (settings.ADMIN_LOGIN == username)
    pwd_valid = check_password(password, settings.ADMIN_PASSWORD)

    print('ID Check... ' + str(login_valid))
    print('PW Check... ' + str(pwd_valid))

    if not (login_valid and pwd_valid):
        print('Login Failed')
        return HttpResponse(False)
    else:
        print('Success Login')
        return HttpResponse(True)