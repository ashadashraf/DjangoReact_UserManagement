from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.contrib.auth import get_user_model

# User = get_user_model()

class UserDocuments(AbstractUser):
    phone_number = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    user_bio = models.CharField(max_length=50)
    place = models.CharField(max_length=25)
    profile_image = models.ImageField(upload_to='static',blank=False)
    verified = models.BooleanField(default=False)
    username = models.CharField(unique=True, max_length=15, null=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [username, phone_number, email, user_bio, place, profile_image]
    
    def __str__(self):
        return self.username
    