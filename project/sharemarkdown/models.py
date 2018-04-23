from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Folder(models.Model):
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    folder_name = models.CharField(max_length=30)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class Document(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=30)
    public = models.BooleanField(default=False)
    content = models.TextField(default='')
    parent_folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True)
    viewers = models.ManyToManyField(User, through='ViewRight', related_name='can_be_viewed_by')
    editors = models.ManyToManyField(User, through='EditRight', related_name='can_be_edited_by')


class EditRight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    granted_date = models.DateField(default=datetime.now, blank=True)


class ViewRight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    granted_date = models.DateField(default=datetime.now, blank=True)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
