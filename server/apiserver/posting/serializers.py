from django.forms import widgets  
from rest_framework import serializers  
from posting.models import Posting
from django.contrib.auth.models import User


class PostingSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Posting
        fields = ('id', 'title', 'content', 'owner')    


class UserSerializer(serializers.ModelSerializer):  
    posting = serializers.PrimaryKeyRelatedField(many=True, queryset=Posting.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'posting')