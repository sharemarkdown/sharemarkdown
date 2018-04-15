from django.urls import path
from . import views
import rest_framework.authtoken.views as token_view
urlpatterns = [
    path('api/user/', views.ListCreateUser.as_view()),
    path('api/document/', views.ListCreateDocument.as_view()),
    path('api/folder/', views.ListCreateFolder.as_view()),
    path('api/register', views.CreateUserView.as_view()),
    path('api/login/', token_view.obtain_auth_token),
]
