from django.db import models

# Create your models here.
class Posting(models.Model):  
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    content = models.TextField()
    
    owner = models.ForeignKey('auth.User', related_name='snippets')  

    class Meta:
        ordering = ('created',)