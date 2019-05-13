from api import models
from api.serializers import TaskListSerializer, TaskSerializer
from rest_framework import views
from rest_framework.response import Response
from rest_framework import mixins
from django.http import Http404
from rest_framework import generics


class TaskLists(generics.ListCreateAPIView):
    #queryset = models.TaskList.objects.all()
    serializer_class = TaskListSerializer

    def get_queryset(self):
        return models.TaskList.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TasksById(generics.ListAPIView):
    queryset = models.Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'pk'
