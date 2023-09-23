from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token
from django.contrib.auth.password_validation import validate_password
from data.models import UserDocuments
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDocuments
        fields = ('__all__')

class AdminJWTTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_staff'] = user.is_staff
        return token

class JWTTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['phone_number'] = user.phone_number
        token['user_bio'] = user.user_bio
        token['place'] = user.place
        token['profile_image'] = str(user.profile_image)
        token['verified'] = user.verified

        return token
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserDocuments
        fields = ('__all__')
        # fields = ('username', 'phone_number', 'email', 'user_bio', 'place', 'profile_image', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = UserDocuments.objects.create(
            username=validated_data['username'],
            phone_number=validated_data['phone_number'],
            email=validated_data['email'],
            user_bio=validated_data['user_bio'],
            place=validated_data['place'],
            profile_image=validated_data['profile_image'],
            verified=True

        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    
