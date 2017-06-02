from __future__ import unicode_literals

from django import forms

from .models import Posting
from .models import Images


class PostForm(forms.ModelForm):
    class Meta:
        model = Posting
        fields = ('title', 'content', 'image', )
        # exclude = ('filtered_image', )    # 사용해야할 모델 필드가 그렇지 않은 것보다 많을경우 역으로 사용하지 않을 필드를 지정

class ImageForm(forms.ModelForm):
    class Meta:
        model = Images
        fields = ('image', 'postId', )