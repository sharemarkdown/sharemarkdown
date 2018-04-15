from rest_framework import serializers
from sharemarkdown.models import Folder, Document
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = ('password', 'username', 'first_name', 'last_name', 'email')


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

