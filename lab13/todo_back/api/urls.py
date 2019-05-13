from django.urls import path

from .views.cbv import TasksById, TaskLists
from .views.fbv import task_list_view
from .views.auth import login, logout, UserList


from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('users/', UserList.as_view()),
    path('login/', login),
    path('logout/', logout),
    path('task_lists/', TaskLists.as_view()),
    path('task_lists/<int:pk>/', task_list_view),
    path('task_lists/<int:pk>/tasks/', TasksById.as_view())
]
