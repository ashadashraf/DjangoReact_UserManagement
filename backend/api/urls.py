from django.urls import path
from data.views import UserList, UserDetail, JWTTokenObtainView, testEndPoint, getRoutes, RegisterView, JWTTokenObtainAdminView, AllUserDetail
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    # path('user/', UserList.as_view()),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('user/<int:pk>/', UserDetail.as_view()),
    path('admin/', AllUserDetail.as_view()),
    path('admintoken/', JWTTokenObtainAdminView.as_view(), name='token-obtain_pair'),
    path('token/', JWTTokenObtainView.as_view(), name='token-obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test/', testEndPoint, name='test'),
    path('', getRoutes),
]