import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  public pinnedTasksTotal: BehaviorSubject<number> = new BehaviorSubject(0);
  public completeTasksTotal: BehaviorSubject<number> = new BehaviorSubject(0);

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
      this.completeTasksTotal.next(this.calcCompleteTasksTotal());
    }, 1000)
  }

  pin(id: number) {
    this.tasks.find((task) => {
      if (task.id === id) {
        task.pinned = !task.pinned;
      }
    })
    this.pinnedTasksTotal.next(this.calcPinnedTasksTotal());
  }

  sort(): Todo[] {
    return this.tasks.sort((a, b) => (a.pinned === b.pinned) ? 0 : a.pinned ? -1 : 1);
  }

  remove(id: number) {
    this.tasks = this.tasks.filter((task) => id !== task.id);
    this.pinnedTasksTotal.next(this.calcPinnedTasksTotal());
    this.completeTasksTotal.next(this.calcCompleteTasksTotal());
  }

  saveTasks(tasks: Todo[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks(): Todo[] {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  }

  calcPinnedTasksTotal(): number {
    return this.tasks.reduce((acc, val) => acc + (val.pinned ? 1 : 0), 0);
  }

  calcCompleteTasksTotal(): number {
    return this.tasks.reduce((acc, val) => acc + (val.complete ? 1 : 0), 0);
  }
}
