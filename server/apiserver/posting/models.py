from django.db import models

# Create your models here.
class Posting(models.Model):  
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    content = models.TextField()
    
    owner = models.ForeignKey('auth.User', related_name='posting')  

    class Meta:
        ordering = ('created',)



class Images(models.Model):
    image = models.ImageField(upload_to='image/%Y/%m/%d/orig')                # '원본 사진 파일'
    created_at = models.DateTimeField(auto_now_add=True)                #'생성일시'

    class Meta:
        ordering = ('-created_at', '-pk', )

    # def delete(self, *args, **kwargs):
    #     self.image.delete()
    #     self.filtered_image.delete()
    #     super(Photo, self).delete(*args, **kwargs)

    # def get_absolute_url(self):
    #     url = reverse_lazy('detail', kwargs={'pk': self.pk})
    #     return url