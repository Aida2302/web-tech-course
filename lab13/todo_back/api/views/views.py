from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator

from api import models
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from api.serializers import TaskListSerializer, TaskSerializer


class TaskLists(View):

    def get(self, request):
        task_lists = models.TaskList.objects.all()
        serializer = TaskListSerializer(task_lists, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = json.loads(request.body)
        serializer = TaskListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors)


class TaskList(View):

    def get(self, request, id):
        try:
            task_list = models.TaskList.objects.get(id=id)
        except models.TaskList.DoesNotExist as e:
            return JsonResponse({'error': 'tasklist with such id does not exist'}, safe=False, status=404)

        serializer = TaskListSerializer(task_list)
        return JsonResponse(serializer.data, safe=False)

    def delete(self, request, id):
        try:
            task_list = models.TaskList.objects.get(id=id)
        except models.TaskList.DoesNotExist as e:
            return JsonResponse({'error': 'tasklist with such id does not exist'}, safe=False, status=404)

        task_list.delete()
        serializer = TaskListSerializer(task_list)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, id):
        try:
            task_list = models.TaskList.objects.get(id=id)
        except models.TaskList.DoesNotExist as e:
            return JsonResponse({'error': 'tasklist with such id does not exist'}, safe=False, status=404)

        data = json.loads(request.body)
        serializer = TaskListSerializer(instance=task_list, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200, safe=False)
        return JsonResponse(serializer.errors)



class TasksById(View):

    def get(self, request, id):
        try:
            tasks = models.Task.objects.filter(task_list=id)
        except models.Task.DoesNotExist as e:
            return JsonResponse({'error': 'tasklist with such id does not exist'}, safe=False)

        serializer = TaskSerializer(tasks, many=True)

        return JsonResponse(serializer.data, status=201, safe=False)

    def post(self, request, id):
        data = json.loads(request.body)
        data['task_list'] = id
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


