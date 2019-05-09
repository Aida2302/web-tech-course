import { Injectable } from '@angular/core';
import {Task, TaskDetailed, TaskList} from '../models/task';
import {MainService} from './main.service';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  getTaskLists(): Promise<TaskList[]> {
    return this.get('http://127.0.0.1:8000/api/task_lists/', {});
  }

  getTaskListDetail(id: number): Promise<TaskList> {
    return this.get(`http://127.0.0.1:8000/api/task_lists/${id}/`, {});
  }


  createTaskList(name: any): Promise<TaskList> {
    return this.post('http://127.0.0.1:8000/api/task_lists/', {
      name: name
    });
  }

  updateTaskList(taskList: TaskList): Promise<TaskList> {
    return this.put(`http://127.0.0.1:8000/api/task_lists/${taskList.id}/`, {
      name: taskList.name
    });
  }

  deleteTaskList(id: number): Promise<any> {
    return this.delete(`http://127.0.0.1:8000/api/task_lists/${id}/`, {});
  }


  getTaskListTasks(id: number): Promise<Task[]> {
    return this.get(`http://127.0.0.1:8000/api/task_lists/${id}/tasks/`, {});
  }


  getTaskDetail(id: number): Promise<TaskDetailed> {
    return this.get(`http://127.0.0.1:8000/api/tasks/${id}/`, {});
  }

  createTask(taskListId: number, name: string, due_on: string, status: string): Promise<TaskDetailed> {
    return this.post(`http://127.0.0.1:8000/api/task_lists/${taskListId}/tasks/`, {
      name: name,
      due_on: due_on,
      status: status
    });
  }

  updateTask(task: Task): Promise<TaskDetailed> {
    return this.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      name: task.name,
      status: task.status
    });
  }

  deleteTask(id: number): Promise<any> {
    return this.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {});
  }

}
