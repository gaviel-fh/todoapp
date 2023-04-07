// todo-list/todo.store.ts
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { TodoFilter } from './todo-list-filter/todo-list-filter.component';
import { Observable, switchMap, tap } from 'rxjs';

interface TodoListState {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: Partial<TodoFilter>;
}

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  constructor(private todoService: TodoService) {
    super({ todos: [], filteredTodos: [], filter: {} });
  }

  readonly todos$ = this.select((state) => state.todos);
  readonly filter$ = this.select((state) => state.filter);
  readonly filteredTodos$ = this.select(
    this.todos$,
    this.filter$,
    (todos, filter) => this.filterTodos(todos, filter)
  );

  public readonly loadTodos = this.effect(() =>
    this.todoService.getTodos().pipe(
      tap((todos) => {
        this.patchState({ todos });
        this.patchState({ filteredTodos: todos });
      })
    )
  );

  public readonly addTodo = this.effect((todo$: Observable<Todo>) =>
    todo$.pipe(
      switchMap((todo) =>
        this.todoService.addTodo(todo).pipe(
          tap((newTodo) => {
            this.patchState((state) => ({ todos: [...state.todos, newTodo] }));
          })
        )
      )
    )
  );

  public readonly deleteTodo = this.effect((todoId$: Observable<number>) =>
    todoId$.pipe(
      switchMap((todoId) =>
        this.todoService.deleteTodo(todoId).pipe(
          tap(() => {
            this.patchState((state) => {
              const updatedTodos = state.todos.filter(
                (todo) => todo.id !== todoId
              );
              return { todos: updatedTodos };
            });
          })
        )
      )
    )
  );

  public readonly updateTodo = this.effect((todo$: Observable<Todo>) =>
    todo$.pipe(
      switchMap((todo) =>
        this.todoService.updateTodo(todo).pipe(
          tap((updatedTodo) => {
            if (!updatedTodo) return;

            this.patchState((state) => {
              const index = state.todos.findIndex(
                (todo) => todo.id === updatedTodo.id
              );
              const updatedTodos = [...state.todos];
              updatedTodos[index] = updatedTodo;
              return { todos: updatedTodos };
            });
          })
        )
      )
    )
  );

  public readonly setFilters = this.updater(
    (state, filters: Partial<TodoFilter>) => {
      return { ...state, filters };
    }
  );

  private filterTodos(todos: Todo[], filter: Partial<TodoFilter>): Todo[] {
    return todos.filter((todo) => {
      let titleMatch = true;
      let dueAtMatch = true;
      let createdAtMatch = true;
      let isCompletedMatch = true;
      let priorityMatch = true;

      if (filter.title) {
        titleMatch = todo.title
          .toLowerCase()
          .includes(filter.title.toLowerCase());
      }

      if (filter.dueAt) {
        if (todo.dueAt) {
          dueAtMatch = new Date(todo.dueAt) >= new Date(filter.dueAt);
        } else {
          dueAtMatch = false;
        }
      }

      if (filter.createdAt) {
        createdAtMatch = new Date(todo.createdAt) >= new Date(filter.createdAt);
      }

      if (filter.isCompleted) {
        isCompletedMatch = todo.isCompleted === filter.isCompleted;
      }

      if (filter.priority) {
        priorityMatch = todo.priority === filter.priority;
      }
      console.log(todos);
      return (
        titleMatch &&
        dueAtMatch &&
        createdAtMatch &&
        isCompletedMatch &&
        priorityMatch
      );
    });
  }
}
