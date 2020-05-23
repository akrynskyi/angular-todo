import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class RecycleService {

  subject: Subject<Todo> = new Subject();

  constructor() { }

  getItem(item: Todo) {
    this.subject.next(item);
  }

  notify() {
    return this.subject.asObservable();
  }
}
