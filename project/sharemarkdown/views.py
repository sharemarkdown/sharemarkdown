from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from rest_framework.response import Response


# Create your views here.


class ExampleView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'username': request.user.username,  # `django.contrib.auth.User` instance.
            'lastname': request.user.last_name,  # None
        }
        return Response(content)
