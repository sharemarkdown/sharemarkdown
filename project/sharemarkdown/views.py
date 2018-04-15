from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from sharemarkdown.serializers import UserSerializer, DocumentSerializer, FolderSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from sharemarkdown.models import Document, Folder
from rest_framework.response import Response

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


class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [
        permissions.AllowAny  # Or anon users can't register
    ]
    serializer_class = UserSerializer


class ExampleView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'username': request.user.username,  # `django.contrib.auth.User` instance.
            'lastname': request.user.last_name,  # None
        }
        return Response(content)
