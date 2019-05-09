import { Component, OnInit } from '@angular/core';
import {ProviderService} from "../shared/services/provider.service";
import {TaskList, Task} from '../shared/models/task';
import {ActivatedRoute} from "@angular/router";

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

  constructor(private provider: ProviderService, private router: ActivatedRoute ) { }

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.taskLists = res;
      setTimeout(() => {
        this.loading = true;
      }, 2000);
    });
  }

  getTaskList(){
    this.id = parseInt(this.router.snapshot.paramMap.get('id'));
    if(this.id) {
      this.provider.getTaskListDetail(this.id).then(res => {
        this.taskList = res
      })
    }
  }

  getTaskListTasks(){
    this.id = parseInt(this.router.snapshot.paramMap.get('id'));
    if(this.id) {
      this.provider.getTasks(this.id).then(res => {
        this.tasks = res
      });
      // this.provider.getTaskListDetail(this.id).then(res => {
      //   this.taskList = res
      // })
    }
  }

  getTaskDetail(){
    this.id = parseInt(this.router.snapshot.paramMap.get('id'));

    if(this.id) {
      this.provider.getTaskDetail(this.id).then(res => {
        this.task = res
      })
    }
  }


}
