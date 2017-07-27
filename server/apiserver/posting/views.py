from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from posting.models import Posting
from posting.models import Images
from posting.serializers import PostingSerializer
from posting.serializers import UserSerializer

from django.contrib.auth.models import User
from rest_framework.reverse import reverse
from rest_framework import viewsets

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from posting.forms import PostForm
import json
from posting.forms import ImageForm

from django.contrib.auth import models

from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth.hashers import check_password

from django.http import QueryDict

from django.core.files import File
import base64

import os

ADMIN_LOGIN = User.objects.get(pk=1).username
ADMIN_PASSWORD = User.objects.get(pk=1).password


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
def getImageByPostId(request):
    data = []
    postId = request.POST['postId']
    # print(postId)
    img = Images.objects.filter(postId_id=postId)
    if(img):
        ############ base64 방식 #############
        # f = open(settings.FILES_DIR + '/' + str(img[0].image), 'rb')
        # image = File(f)
        # print(image)
        # data = base64.b64encode(image.read())
        # f.close()
        ######################################

        # print(str(img[0].image))
        # data = str(img[0].image)
        for row in img:
            data.append(str(row.image))
        # data.append(str(img[0].image))        # test

        data = json.dumps(data)
    else:
        data = False
    # print(data)
    return HttpResponse(data, content_type = "application/json")



@csrf_exempt
def uploadPost(request):
    result = False

    # data = json.loads(request.body)
    # username = data['user']
    username = request.POST['user']
    password = request.POST['password']
    title = request.POST['title']
    content = request.POST['content']
    # fileCheck = request.FILES.get('image', False)
    
    # print('---------')
    # print(fileCheck)
    # print('---------')

    login_valid = (ADMIN_LOGIN == username)
    pwd_valid = check_password(password, ADMIN_PASSWORD)

    # dict = {'user': username, 'password': password, 'title': title, 'content': content}
    # qdict = QueryDict('', mutable=True)
    # qdict.update(dict)

    # print(request.POST)
    # print(qdict)

    postForm = PostForm(request.POST)

    # form = PostForm(qdict)
    user_row = models.User.objects.get(username=request.POST['user'])
    # row = models.User.objects.get(username=username)

    if not login_valid and pwd_valid:
        return HttpResponse(False)

    # print(user_row.username)
    # print(form)


    if postForm.is_valid():
        post_obj = postForm.save(commit=False)      # true일 경우 바로 데이터베이스에 적용, 현재 유저정보가 담기지 않았기에 not null 제약조건에 걸려 작업이 실패하므로 false
        post_obj.owner_id = user_row.id
        post_obj.save()      # obj.save(commit=True) 와 동일


        # 이미지 복수 업로드를 위해 분리
        # if(fileCheck):
        #     post_row = Posting.objects.all().last()

        #     dict = {'postId': post_row.id,}
        #     qdict = QueryDict('', mutable=True)
        #     qdict.update(dict)

        #     # print(qdict)
        #     # print('------------------------------------')
        #     # print(request.POST)

        #     imageForm = ImageForm(qdict, request.FILES)
        #     # print(imageForm.is_valid())

        #     img_obj = imageForm.save(commit=False)
        #     img_obj.save()
        #     print(" - Image included")


        print("Create Post Request : Post success")
        result = True
        
    else:
        print("Create Post Request : Post error")

    # print(request.POST['user'])
    # print(type(request.user))
    # print(json.dumps(request.POST))
    return HttpResponse(result)



@csrf_exempt
def updatePost(request):

    # data = json.loads(request.body)
    # postId = data['postId']
    # title = data['title']
    # content = data['content']
    # username = data['user']
    # password = data['password']
    postId = request.POST['postId']
    title = request.POST['title']
    content = request.POST['content']
    username = request.POST['user']
    password = request.POST['password']
    fileCheck = request.FILES.get('image', False)
    if(not fileCheck):
        fileCheck = request.POST.get('image', False)
    
    # print(fileCheck)

    login_valid = (ADMIN_LOGIN == username)
    pwd_valid = check_password(password, ADMIN_PASSWORD)

    if not login_valid and pwd_valid:
        return HttpResponse(False)

    result = False
    log = ''

    try:
        row = Posting.objects.get(id=postId)
    except Posting.DoesNotExist:
        print("Update Post Request : [Failed]No Posting matches the given query.")
        return HttpResponse(result)

    if row != None:
        row.title = title
        row.content = content

        if(fileCheck):
            if(fileCheck == "None"):
                print('Update Post Request : Image delete request')
                isEmpty = False
                try:
                    obj = Images.objects.filter(postId_id=postId)
                except Images.DoesNotExist:
                    isEmpty = True
                    print(" - This post have not image.")

                if(not isEmpty):
                    for img_row in img_obj:
                        file_path = os.path.join(settings.FILES_DIR, str(img_obj.image))
                        if os.path.isfile(file_path):
                            os.remove(file_path)
                            # print("image delete")
                        else:
                            print("image delete error")
                            return HttpResponse(result)
                        img_row.delete()
                        print("- Image deleted")
            else:
                print('Update Post Request : Image update request')
                isEmpty = False
                try:
                    img_row = Images.objects.get(postId_id=postId)
                except Images.DoesNotExist:
                    isEmpty = True

                if(isEmpty):
                    dict = {'postId': postId,}
                    qdict = QueryDict('', mutable=True)
                    qdict.update(dict)

                    imageForm = ImageForm(qdict, request.FILES)
                    img_obj = imageForm.save(commit=False)
                    img_obj.save()

                    print(" - Image included")
                
                else:
                    print(img_row)
                    img_row.image = fileCheck

                    file_path = os.path.join(settings.FILES_DIR, str(img_row.image))
                    if os.path.isfile(file_path):
                        os.remove(file_path)
                        # print("image delete")
                    else:
                        print("Warning - previous image delete error")
                        # return HttpResponse(result)

                    img_row.save()
                    print(" - Image updated")


        row.save()
        log += 'Update Post Request : post ' + str(row.id) + ' Update success'
        print(log)
        result = True
    else:
        print("Update Post Request : Update error")

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

    print(postId)

    login_valid = (ADMIN_LOGIN == username)
    pwd_valid = check_password(password, ADMIN_PASSWORD)

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

        isEmpty = False
        try:
            img_obj = Images.objects.filter(postId_id=row.id)
        except Images.DoesNotExist:
            isEmpty = True

        if(not isEmpty):
            for img_row in img_obj:
                file_path = os.path.join(settings.FILES_DIR, str(img_row.image))
                if os.path.isfile(file_path):
                    os.remove(file_path)
                    print(str(img_row.image) + "image delete")
                else:
                    print("image delete error")
                    return HttpResponse(result)
        else:
            print("not image")


        row.delete()
        print(log)
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

    # ADMIN_LOGIN = User.objects.get(pk=1).username
    # ADMIN_PASSWORD = User.objects.get(pk=1).password
    # print(User.objects.get(pk=1).username)
    # print(User.objects.get(pk=1).password)

    # print('ID : ' + username)
    # print('PW : ' + password)

    login_valid = (ADMIN_LOGIN == username)
    pwd_valid = check_password(password, ADMIN_PASSWORD)

    # print(password)
    # print(settings.ADMIN_PASSWORD)

    print('ID Check... ' + str(login_valid))
    print('PW Check... ' + str(pwd_valid))

    if not (login_valid and pwd_valid):
        print('Login Failed')
        return HttpResponse(False)
    else:
        print('Success Login')
        return HttpResponse(True)



@csrf_exempt
def uploadImage(request):

    result = False

    # print(request.FILES)
    # print(request.POST)

    fileInfo = request.FILES
    username = request.POST['user']
    password = request.POST['password']

    login_valid = (ADMIN_LOGIN == username)
    pwd_valid = check_password(password, ADMIN_PASSWORD)

    # form = ImageForm(request.POST, request.FILES)

    fileCheck = request.FILES.get('image', False)
    
    # print('---------')
    # print(fileCheck)
    # print('---------')

    if not login_valid and pwd_valid:
        return HttpResponse(False)

    if fileCheck:
        post_row = Posting.objects.all().last()     # 막 업로드 된 최신 게시글에 이미지 FK로 연결

        dict = {'postId': post_row.id,}
        qdict = QueryDict('', mutable=True)
        qdict.update(dict)

        # print(qdict)
        # print('------------------------------------')
        # print(request.POST)

        imageForm = ImageForm(qdict, request.FILES)
        # print(imageForm.is_valid())

        img_obj = imageForm.save(commit=False)
        img_obj.save()
        # print(" - Image included")

        # obj = form.save(commit=False)      # true일 경우 바로 데이터베이스에 적용, 현재 유저정보가 담기지 않았기에 not null 제약조건에 걸려 작업이 실패하므로 false
        # obj.owner_id = row.id
        # obj.save()      # obj.save(commit=True) 와 동일
        print("Image Upload Request : Upload success")
        result = True
    else:
        print("Image Upload Request : Upload error")

    return HttpResponse(result)



def my_image(request):

    # postId = request.POST['postId']
    # # print(postId)
    # img = Images.objects.filter(postId_id=postId)
    # if(img):
    #     f = open(str(img[0].image), 'rb')
    #     image = File(f)
    #     # print(magic.from_file(image))
    #     data = base64.b64encode(image.read())
    #     f.close()
    # else:
    #     data = False

    file_path = os.path.join(settings.FILES_DIR, 'test_image.png')
    print(file_path)
    image_data = open(file_path, "rb").read()
    return HttpResponse(image_data, content_type="image/png")