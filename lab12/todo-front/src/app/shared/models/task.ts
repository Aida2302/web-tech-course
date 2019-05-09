export interface TaskList {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  name: string;
  status: string;
}

export interface TaskDetailed {
  id: number;
  name: string;
  created_at: string;
  due_on: string;
  status: string;
  task_list: string;
}
