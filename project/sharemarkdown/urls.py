from django.urls import path

import sharemarkdown.views.DocumentView
import sharemarkdown.views.FolderView
import sharemarkdown.views.UserView
import sharemarkdown.views.GeneralView
import rest_framework.authtoken.views as token_view
#from sharemarkdown.views import DocumentView, FolderView, UserView

urlpatterns = [
    path('api/user', sharemarkdown.views.UserView.ListCreateUser.as_view()),
    path('api/documents', sharemarkdown.views.DocumentView.ListCreateDocument.as_view()),
    path('api/document/<int:id>', sharemarkdown.views.DocumentView.GetUpdateDeleteDocument.as_view()),
    path('api/folder', sharemarkdown.views.UserView.ListCreateFolder.as_view()),
    path('api/register', sharemarkdown.views.UserView.CreateUserView.as_view()),
    path('api/login', token_view.obtain_auth_token),
    path('api/folders', sharemarkdown.views.FolderView.ListCreateFolder.as_view()),
    path('api/folder/<int:id>', sharemarkdown.views.FolderView.GetUpdateDeleteFolder.as_view()),
    path('api/files/<int:id>', sharemarkdown.views.GeneralView.GetDocsInFolderView.as_view()),
    path('api/files', sharemarkdown.views.GeneralView.GetDocsInFolderView.as_view()),
    path('api/share/doc', sharemarkdown.views.GeneralView.EditRightView.as_view())
]
