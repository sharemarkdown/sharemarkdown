from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from rest_framework.response import Response



# Create your views here.


class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [
        permissions.AllowAny  # Or anon users can't register
    ]
    serializer_class = UserSerializer


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

    def get_object(self, *args, **kwargs):
        obj = get_object_or_404(Document, **self.kwargs)
        print(obj.owner.id)
        print(self.request.user.id)
        if obj.owner.id != self.request.user.id:
            raise PermissionDenied(
                detail='You do not have permission')
        return obj

    def update(self, request, *args, **kwargs):
        old_doc = get_object_or_404(Document, **kwargs)
        if old_doc.owner.id != request.user.id:
            raise PermissionDenied(
                detail='You do not have permission')
        query_dict = request.data.copy()
        query_dict['owner'] = request.user.id
        doc_serializer = DocumentSerializer(old_doc, data=query_dict)
        if doc_serializer.is_valid(raise_exception=True):
            doc_serializer.save()
            return Response(doc_serializer.data, status=200)



class ExampleView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'username': request.user.username,  # `django.contrib.auth.User` instance.
            'lastname': request.user.last_name,  # None
        }
        return Response(content)
