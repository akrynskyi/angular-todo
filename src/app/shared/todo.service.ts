import { Injectable } from '@angular/core';

export interface Todo {
  id: number
  body: string
  date: any
  completeDate?: any
  complete: boolean
  pinned: boolean
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  public tasks: Todo[] = [];

  addToList(task: Todo) {
    this.tasks.unshift(task);
    this.saveTasks(this.tasks);
  }

  complete(id: number) {
    setTimeout(() => {
      this.tasks.find((task) => {
        if (task.id === id) {
          task.complete = !task.complete;
          task.completeDate = new Date;
        }
      })
      this.saveTasks(this.tasks);
    }, 1000)
  }

  pin(id: number) {
    this.tasks.find((task) => {
      if (task.id === id) {
        task.pinned = !task.pinned;
      }
    })
  }

  sort() {
    return this.tasks.sort((a, b) => (a.pinned === b.pinned) ? 0 : a.pinned ? -1 : 1);
  }

  remove(id: number) {
    this.tasks = this.tasks.filter((task) => id !== task.id);
  }

  saveTasks(tasks: Todo[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks(): Todo[] {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  }
}
