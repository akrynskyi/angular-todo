import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  bodyContent = '';
  empty: boolean;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    console.log(this.bodyContent);
  }

  addTask(event: Event) {
    event.preventDefault();
    if (this.bodyContent.length) {
      const newTask: Todo = {
        id: Date.now(),
        body: this.bodyContent,
        date: new Date(),
        complete: false,
      }
      this.todoService.addToList(newTask);
      this.bodyContent = '';
      this.empty = false;
    } else {
      this.empty = true;
    }
  }
}
