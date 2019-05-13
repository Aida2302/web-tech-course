from django.shortcuts import render

# Create your views here.
from django.utils.decorators import method_decorator

from api import models
from api.serializers import TaskListSerializer, TaskSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(['GET', 'PUT', 'DELETE'])
def task_list_view(request, pk):
    try:
        task_list = models.TaskList.objects.filter(created_by=request.user).get(pk=pk)
    except models.TaskList.DoesNotExist as e:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskListSerializer(task_list)
        return Response(serializer.data)

    if request.method == 'DELETE':
        task_list.delete()
        serializer = TaskListSerializer(task_list)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = TaskListSerializer(task_list, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


