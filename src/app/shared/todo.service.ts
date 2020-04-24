import { Injectable } from '@angular/core';

export interface Todo {
  id: number
  body: string
  date: any
  completeDate?: any
  complete: boolean
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  public tasks: Todo[] = [
    {
      id: 1,
      body: 'My first todo',
      date: new Date(),
      complete: false,
    },
    {
      id: 2,
      body: 'My first todo',
      date: new Date(),
      complete: false,
    }
  ]

  complete(id: number) {
    setTimeout(() => {
      this.tasks.find((task) => {
        if (task.id === id) {
          task.complete = !task.complete;
          task.completeDate = new Date;
        }
      })
    }, 1000)
  }

  remove(id: number) {
    this.tasks = this.tasks.filter((task) => id !== task.id);
  }

  addToList(task: Todo) {
    this.tasks.unshift(task);
  }
}
