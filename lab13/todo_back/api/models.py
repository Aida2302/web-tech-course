from django.db import models

from django.contrib.auth.models import User


class TaskList(models.Model):
    name = models.CharField(max_length=50)

    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=2)

    def __str__(self):
        return "List:" + self.name

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Task(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    due_on = models.DateTimeField()
    status = models.CharField(max_length=50, default='TODO')
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE)

    def __str__(self):
        return "List:" + self.name

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at,
            'due_on': self.due_on,
            'status': self.status,
            'task_list': self.task_list.name
        }


