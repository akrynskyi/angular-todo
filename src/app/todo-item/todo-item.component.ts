import { Component, OnInit, Input } from '@angular/core';
import { TodoService, Todo } from '../shared/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() taskItem: Todo;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

  completeToggle(id: number) {
    this.todoService.complete(id);
  }

  removeTask(id: number) {
    this.todoService.remove(id);
  }
}
