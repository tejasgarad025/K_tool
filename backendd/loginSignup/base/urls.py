from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from base import views
#my imports
from .views import add_inputs,list_inputs,save_pos_data,download_pos_data
#user
from .views import RegisterView, LoginView, MyTokenObtainPairView
#upload_user
from django.contrib.auth import views as auth_views
from .views import upload_login, upload_logout, upload_file, process_files, get_next_sentence,add_sentence

urlpatterns = [
    #my paths
    path('inputs/add', add_inputs, name='add_inputs'),
    path('add_sentence', add_sentence, name='add_sentence'),
    path('inputs/', list_inputs, name='list_inputs'),
    path('save-pos',save_pos_data,name='save_pos'),
    path("download-pos",download_pos_data, name="download-pos"),
    #user
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/", views.MyTokenObtainPairView.as_view()),
    #upload_user
    path("loginMU/", upload_login, name="upload_login"),
    path("logout/", upload_logout, name="upload_logout"),
    path("upload/", upload_file, name="upload_file"),
    path("process/", process_files, name="process_files"),
    path("get-sentence/", get_next_sentence, name="get_sentence"),
]


"""path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path("dashboard/", views.dashboard),"""