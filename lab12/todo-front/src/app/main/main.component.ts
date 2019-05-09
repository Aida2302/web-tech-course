import { Component, OnInit } from '@angular/core';
import {Task, TaskDetailed, TaskList} from '../shared/models/task';
import {ProviderService} from '../shared/services/provider.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  public loading = false;

  public taskLists: TaskList[] = [];

  public id: number;

  public task: any = {};

  public taskList: any = {};

  public tasks: Task[] = [];

  public taskName: string = "";
  public taskDueOn: any = new Date().toISOString();
  public taskStatus: string = "";
  public taskListName: string = "";

  constructor(private provider: ProviderService, private router: ActivatedRoute ) { }

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.taskLists = res;
      setTimeout(() => {
        this.loading = true;
      }, 2000);
    });
  }


 getTasks(task: Task) {
    this.provider.getTaskListTasks(task.id).then(res => {
      this.tasks = res;
    });
  }

  createTask(){
    if(this.taskName != '' && this.taskDueOn != '' && this.taskStatus != ''){
      this.provider.createTask(this.taskList.id, this.taskName, this.taskDueOn, this.taskStatus).then(res => {
        this.tasks.push(res)
        this.loading = true;
      })
    }
  }

  updateTask(c: Task){
    this.provider.updateTask(c).then(res => {
      this.task = res
    })
  }

  deleteTask(c: Task){
    this.provider.deleteTask(c.id).then(() => {
      console.log(c.name + ' deleted');
    })
  }

  createTaskList(){
    if(this.taskListName != ''){
      this.provider.createTaskList(this.taskListName).then(res => {
        this.taskLists.push(res)
      })
    }
  }

  updateTaskList(){
    this.provider.updateTaskList(this.taskList).then(res => {
      this.taskList = res
    })
  }

  deleteTaskList(){
    this.provider.deleteTaskList(this.taskList.id).then(() => {
      console.log(this.taskLists + ' deleted');
      this.provider.getTaskLists().then(r => {
         this.taskLists = r;
       });
    })
  }

}

