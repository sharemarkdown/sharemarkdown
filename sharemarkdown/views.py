from django.shortcuts import render

from sharemarkdown.serializers import UserSerializer, DocumentSerializer, FolderSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from sharemarkdown.models import Document, Folder
# Create your views here.


class ListCreateUser(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ListCreateDocument(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


class ListCreateFolder(generics.ListCreateAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
