import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Todo } from './todo.model';
import { dummyTodos } from './dummy-todos';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = dummyTodos;
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
    // return this.http.get<Todo[]>('api/todos');
  }

  addTodo(todo: Todo): Observable<Todo> {
    this.todos.push(todo);
    return of(todo);
    // return this.http.post<Todo>('api/todos', todo);
  }

  updateTodo(todo: Todo): Observable<Todo | undefined> {
    let oldTodo = this.todos.find((t) => t.id === todo.id);
    if (oldTodo) {
      Object.assign(todo, oldTodo);
    }
    return of(oldTodo);
    // return this.http.put<Todo>(`api/todos/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<number> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    return of(id);
    // return this.http.delete(`api/todos/${id}`);
  }
}
