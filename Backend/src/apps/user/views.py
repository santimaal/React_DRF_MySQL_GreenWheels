from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import serializers
from rest_framework import status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

from src.apps.user.models import User
from src.apps.user.serializers import UserSerializer
from rest_framework.views import APIView

# Create your views here.
# @api_view(['GET', 'POST', 'DELETE'])


class UserView(viewsets.GenericViewSet):
    def getUsers(self, request):
        user = User.objects.all()
        user_serializer = UserSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)

    def getOneUser(self, request, id):
        user = User.objects.get(id=id)
        user_serializer = UserSerializer(user, many=False)
        return JsonResponse(user_serializer.data, safe=False)

    def createUser(self, request):
        user_data = request.data
        user_serializer = UserSerializer(data=user_data)
        if (user_serializer.is_valid(raise_exception=True)):
            user_serializer.save()
        return Response(user_serializer.data)

    def deleteUser(self, request, id):
        user_data = request.data
        user_serializer = UserSerializer(data=user_data)
        if (user_serializer.is_valid() == False):
            User.objects.get(id=id).delete()
        return JsonResponse({'message': 'User eliminado Correctamente', "User": user_serializer.data}, status=status.HTTP_204_NO_CONTENT)

    def register(self, request):

        email = request.data['email']
        password = request.data['password']
        first_name = request.data['first_name']
        last_name = request.data['last_name']

        if email is None:
            raise NotFound("Email is required!")

        if password is None:
            raise NotFound("Password is required!")

        if first_name is None:
            raise NotFound("First Name is required!")

        if last_name is None:
            raise NotFound("Last Name is required!")


class UserRegLog(viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def register(self, request):

        email = request.data['email']
        password = request.data['password']
        first_name = request.data['first_name']
        last_name = request.data['last_name']

        # if email is None:
        #     # raise NotFound("Email is required!")
        #     raise serializers.ValidationError('Email required')

        # if password is None:
        #     raise serializers.ValidationError("Password is required!")

        # if first_name is None:
        #     raise serializers.ValidationError("First Name is required!")

        # if last_name is None:
        #     raise serializers.ValidationError("Last Name is required!")

        serializer_context = {
            'email': email,
            'password': password,
            'first_name': first_name,
            'last_name': last_name
        }

        serializer = UserSerializer.register(serializer_context)

        return Response(serializer, status=status.HTTP_200_OK)
