from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from posting.models import Posting
from posting.serializers import PostingSerializer
from posting.serializers import UserSerializer

from django.contrib.auth.models import User
from rest_framework.reverse import reverse

from rest_framework import viewsets

# Create your views here.
class PostingViewSet(viewsets.ModelViewSet):  
    queryset = Posting.objects.all()
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