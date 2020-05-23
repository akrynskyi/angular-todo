import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.service';
import { RecycleService } from '../shared/recycle.service';

@Component({
  selector: 'app-todo-recyclebin',
  templateUrl: './todo-recyclebin.component.html',
  styleUrls: ['./todo-recyclebin.component.scss']
})
export class TodoRecyclebinComponent implements OnInit {

  overlayToggle = false;
  recycleTasks: Todo[] = [];

  constructor(private recycleService: RecycleService) { }

  ngOnInit(): void {
    this.recycleTasks = [...this.getRecycleTasks()];
    this.recycleService.notify()
      .subscribe((item: Todo) => {
        this.recycleTasks.push({ ...item, deletionDate: new Date() });
        this.saveRecycleTasks();
      });
  }

  toggleRecycleWindow() {
    this.overlayToggle = !this.overlayToggle;
  }

  saveRecycleTasks() {
    localStorage.setItem('recycle', JSON.stringify(this.recycleTasks));
  }

  getRecycleTasks() {
    return localStorage.getItem('recycle') ? JSON.parse(localStorage.getItem('recycle')) : [];
  }

  deleteTask(id: number) {
    this.recycleTasks = this.recycleTasks.filter((task) => task.id !== id);
    this.saveRecycleTasks();
    if (!this.recycleTasks.length) this.overlayToggle = !this.overlayToggle;
  }
}
