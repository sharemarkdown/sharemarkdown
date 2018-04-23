from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.generics import CreateAPIView

from sharemarkdown.models import Folder
from sharemarkdown.serializers import UserSerializer, FolderSerializer


class ListCreateUser(generics.ListCreateAPIView):
    permission_classes = [
        permissions.AllowAny  # Or anon users can't register
    ]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ListCreateFolder(generics.ListCreateAPIView):
    queryset = Folder.objects.all()
    permission_classes = [
        permissions.AllowAny  # Or anon users can't register
    ]
    serializer_class = FolderSerializer


class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [
        permissions.AllowAny  # Or anon users can't register
    ]
    serializer_class = UserSerializer
