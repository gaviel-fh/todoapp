import { Component } from '@angular/core';
import { Todo } from './todo.model';
import { TodoFilter } from './todo-list-filter/todo-list-filter.component';
import { TodoListStore } from './todo-list.store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public todos$: Observable<Todo[]> = this.todoListStore.filteredTodos$;

  constructor(private todoListStore: TodoListStore) {}

  public deleteTodo(id: number) {
    this.todoListStore.deleteTodo(of(id));
  }

  public updateTodo(todo: Todo) {
    this.todoListStore.updateTodo(of(todo));
  }

  filterChanged($event: TodoFilter) {
    this.todoListStore.patchState({ filter: $event });
  }
}
