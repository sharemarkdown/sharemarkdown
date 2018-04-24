from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from sharemarkdown.models import Folder
from sharemarkdown.serializers import FolderSerializer

from django.shortcuts import get_object_or_404


class ListCreateFolder(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = FolderSerializer
    model = Folder

    def create(self, request, *args, **kwargs):
        query_dict = request.data.copy()
        query_dict['owner'] = request.user.id
        folder_serializer = FolderSerializer(data=query_dict)
        if folder_serializer.is_valid(raise_exception=True):
            folder_serializer.save()
            return Response(folder_serializer.data, status=201)

    def get_queryset(self):
        user = self.request.user
        return Folder.objects.filter(owner=user)


class GetUpdateDeleteFolder(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = FolderSerializer
    model = Folder

    def get_object(self):
        obj = get_object_or_404(Folder, **self.kwargs)
        if obj.owner.id != self.request.user.id:
            raise PermissionDenied(
                detail='You do not have permission')
        return obj

    def update(self, request, *args, **kwargs):
        old_folder = get_object_or_404(Folder, **kwargs)
        if old_folder.owner.id != request.user.id:
            raise PermissionDenied(
                detail='You do not have permission')
        query_dict = request.data.copy()
        query_dict['owner'] = request.user.id
        folder_serializer = FolderSerializer(old_folder, data=query_dict)
        if folder_serializer.is_valid(raise_exception=True):
            folder_serializer.save()
            return Response(folder_serializer.data, status=200)
