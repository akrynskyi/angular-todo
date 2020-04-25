import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from './shared/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pinnedTasksTotal: number = this.todoService.tasks.reduce((acc, val) => acc + (val.pinned ? 1 : 0), 0);

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.tasks = [...this.todoService.getTasks()];
    this.todoService.sort();
  }
}
