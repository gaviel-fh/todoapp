import { Component } from '@angular/core';
import { dummyTodos } from './dummy-todos';
import { Todo } from './todo.model';
import { TodoFilter } from './todo-list-filter/todo-list-filter.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public dummyTodos = dummyTodos;

  public deleteTodo($event: number) {
    console.log($event);
  }

  public updateTodo($event: Todo) {
    console.log($event);
  }

  filterChanged($event: TodoFilter) {
    console.log('filterChanged');
    console.log($event);
  }
}
