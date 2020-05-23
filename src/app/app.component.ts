import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.tasks = [...this.todoService.getTasks()];
    this.todoService.sort();
    this.todoService.pinnedTasksTotal.next(this.todoService.calcPinnedTasksTotal());
    this.todoService.completeTasksTotal.next(this.todoService.calcCompleteTasksTotal());
  }
}
