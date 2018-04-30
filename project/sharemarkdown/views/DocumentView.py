from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from sharemarkdown.models import Document
from sharemarkdown.serializers import DocumentSerializer


class ListCreateDocument(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = DocumentSerializer
    model = Document

    def create(self, request, *args, **kwargs):
        query_dict = request.data.copy()
        query_dict['owner'] = request.user.id
        doc_serializer = DocumentSerializer(data=query_dict)
        if doc_serializer.is_valid(raise_exception=True):
            doc_serializer.save()
            return Response(doc_serializer.data, status=201)

    def get_queryset(self):
        user = self.request.user
        return Document.objects.filter(owner=user)


class GetUpdateDeleteDocument(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = DocumentSerializer
    model = Document

    def get_object(self):
        obj = get_object_or_404(Document, **self.kwargs)
        if self.request.user not in obj.editors.all():
            raise PermissionDenied(
                detail='You do not have permission')
        return obj

    def update(self, request, *args, **kwargs):
        old_doc = self.get_object()
        query_dict = request.data.copy()
        query_dict['owner'] = request.user.id
        doc_serializer = DocumentSerializer(old_doc, data=query_dict)
        if doc_serializer.is_valid(raise_exception=True):
            doc_serializer.save()
            return Response(doc_serializer.data, status=200)
