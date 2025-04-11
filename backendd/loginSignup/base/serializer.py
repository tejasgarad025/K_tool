from base.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
#my imports
from .models import InputText,SaveText

"""class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['full name'] = user.profile.full_name
        token['email'] = user.email
        token['username'] = user.username
        token['bio'] = user.profile.bio

        return token 
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required= True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']

    def validate(self, attrs):
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError({"password": "Password fields didn't match."})
            return attrs
        
    def create(self, validated_data):
            user = User.objects.create(username = validated_data['username'], email = validated_data['email'])
            user.set_password(validated_data['password'])
            user.save()
            return user       
       """
#my serialisers
class InputSerializer(serializers.ModelSerializer):
    class Meta:
        model=InputText
        fields='__all__'
    
class SaveTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaveText
        fields = '__all__'

#user
from django.contrib.auth.hashers import make_password
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, User):
        token = super().get_token(User)

        token['full name'] = User.full_name
        token['email'] = User.email
        token['password'] = User.password

        return token 

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required= True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'password']
        
    def create(self, validated_data):
            user = User.objects.create(username = validated_data['full_name'], email = validated_data['email'])
            user.set_password(validated_data['password'])
            user.save()
            return user