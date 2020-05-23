import { Component, OnInit, Input } from '@angular/core';
import { TodoService, Todo } from '../shared/todo.service';
import { RecycleService } from '../shared/recycle.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() taskItem: Todo;

  constructor(
    private todoService: TodoService,
    private recycleService: RecycleService
  ) { }

  ngOnInit(): void {
  }

  completeToggle(id: number) {
    this.todoService.complete(id);
  }

  pinTask(id: number) {
    this.todoService.pin(id);
    this.todoService.saveTasks(this.todoService.tasks);
    this.todoService.sort();
  }

  removeTask(id: number) {
    this.recycleService.getItem(this.taskItem);
    this.todoService.remove(id);
    this.todoService.saveTasks(this.todoService.tasks);
  }
}
