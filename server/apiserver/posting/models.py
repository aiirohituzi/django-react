from django.db import models
from smartfields import fields

from django.conf import settings
import os
from django.core.files.storage import FileSystemStorage

# Create your models here.
class Posting(models.Model):  
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    content = models.TextField()
    
    owner = models.ForeignKey('auth.User', related_name='posting')  

    class Meta:
        ordering = ('created',)



class Images(models.Model):
    fs = FileSystemStorage(location=settings.FILES_DIR)
    image = fields.ImageField(upload_to='%Y/%m/%d/orig', storage=fs)
    # image = fields.ImageField(upload_to='image/%Y/%m/%d/orig')              # '원본 사진 파일'
    created_at = models.DateTimeField(auto_now_add=True)                    # '생성일시'
    postId = models.ForeignKey(Posting, related_name='imageRelate', default='0')
    # 당장은 한개의 image만 post와 연결되지만 여러개의 image가 하나의 post와 연결 될 경우를 생각해서 image에 foreignkey를 등록

    class Meta:
        ordering = ('-created_at', '-pk', )

    # def delete(self, *args, **kwargs):
    #     self.image.delete()
    #     self.filtered_image.delete()
    #     super(Photo, self).delete(*args, **kwargs)

    # def get_absolute_url(self):
    #     url = reverse_lazy('detail', kwargs={'pk': self.pk})
    #     return url