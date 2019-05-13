from rest_framework import serializers
from .models import Task, TaskList
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class TaskListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = TaskList
        fields = ('id', 'name', 'created_by')
        # fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, required=False)
    name = serializers.CharField(required=True)
    created_at = serializers.DateTimeField(read_only=True, required=False)
    due_on = serializers.DateTimeField(required=True)
    status = serializers.CharField(required=False)
    task_list = serializers.PrimaryKeyRelatedField(required=True, queryset=TaskList.objects.all())

    class Meta:
        model = Task
        fields = '__all__'

