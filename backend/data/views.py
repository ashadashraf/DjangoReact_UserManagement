from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics
from .models import UserDocuments
from api.serializers import UserDocumentSerializer,JWTTokenSerializer, RegisterSerializer, AdminJWTTokenSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

User = get_user_model()

class UserList(generics.ListCreateAPIView):
    serializer_class = UserDocumentSerializer

    # def get_queryset(self):
    #     if self.request.method == 'post':
    #         print('sss')
    #     queryset = UserDocuments.objects.all()
    #     return queryset

    queryset = UserDocuments.objects.all()
    permission_classes = (AllowAny,)

class AllUserDetail(generics.ListAPIView):
    queryset = UserDocuments.objects.filter(verified=True)
    serializer_class = UserDocumentSerializer  
    
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserDocumentSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        queryset = UserDocuments.objects.all()
        id = self.request.query_params.get('id')
        if id is not None:
            print('yes')
            print(id)
            queryset = queryset.filter(id=id)
        print('no')
        print(id)
        return queryset
    
    def perform_update(self, serializer):
        if 'profile_image' in self.request.data:
            serializer.save(profile_image=self.request.data['profile_image'])
        else:
            serializer.save()
            

class JWTTokenObtainAdminView(TokenObtainPairView):
    serializer_class = AdminJWTTokenSerializer

    def post(self, request, *args, **kwargs):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user and user.is_staff:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            token = serializer.validated_data
            return Response(token)
        else:
            return Response({'error': 'Unauthorized'}, status=401)

class JWTTokenObtainView(TokenObtainPairView):
    serializer_class = JWTTokenSerializer

class RegisterView(generics.CreateAPIView):
    queryset = UserDocuments.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)