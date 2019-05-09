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

  getTasks(id: number): Promise<Task[]> {
    return this.get(`http://127.0.0.1:8000/api/task_lists/${id}/tasks/`, {});
  }

  getTaskDetail(id: number): Promise<TaskDetailed> {
    return this.get(`http://127.0.0.1:8000/api/tasks/${id}/`, {});
  }
}
