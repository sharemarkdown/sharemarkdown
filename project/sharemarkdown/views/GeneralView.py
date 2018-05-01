from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from sharemarkdown.models import Document, Folder, EditRight
from sharemarkdown.serializers import DocumentSerializer, FolderSerializer, EditRightSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import User



class GetDocsInFolderView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self, request, **kwargs):
        parent_folder = None
        user = request.user
        if 'id' in kwargs:
            parent_folder = kwargs['id']
        docs = Document.objects.filter(parent_folder=parent_folder, editors=user)
        folders = Folder.objects.filter(parent_folder=parent_folder, owner=user)
        doc = DocumentSerializer(docs, many=True)
        folders = FolderSerializer(folders, many=True)
        return Response({'documents': doc.data, 'folders': folders.data})

class EditRightView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        doc_id = request.data['document']
        doc = get_object_or_404(Document, pk=doc_id)
        if doc.owner.id != request.user.id:
            raise PermissionDenied(
                detail='You do not have permission')
        query = request.data.copy()
        query['user'] = get_object_or_404(User, username=query['user']).id
        edit_right_serializer = EditRightSerializer(data=query)
        if edit_right_serializer.is_valid(raise_exception=True):
            edit_right_serializer.save()
            return Response(status=204)
