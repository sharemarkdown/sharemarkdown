from django.urls import path
from . import views
urlpatterns = [
    path('api/user/', views.ListCreateUser.as_view()),
    path('api/document/', views.ListCreateDocument.as_view()),
    path('api/folder/', views.ListCreateFolder.as_view()),
]