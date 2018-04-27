from rest_framework import serializers
from sharemarkdown.models import Folder, Document, EditRight, ViewRight
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = ('password', 'username', 'first_name', 'last_name', 'email', 'id')


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    content = serializers.CharField(allow_blank=True, trim_whitespace=False)
    def create(self, validated_data):
        doc = Document.objects.create(**validated_data)
        EditRight.objects.create(user=validated_data['owner'], document=doc)
        ViewRight.objects.create(user=validated_data['owner'], document=doc)
        return doc

    class Meta:
        model = Document
        fields = '__all__'

class EditRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditRight
        fields = '__all__'
