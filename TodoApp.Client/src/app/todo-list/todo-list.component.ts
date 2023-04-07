import { Component, EventEmitter } from '@angular/core';
import { Todo } from './todo.model';
import { TodoFilter } from './todo-list-filter/todo-list-filter.component';
import { TodoListStore } from './todo-list.store';
import { Observable, Subscription, of } from 'rxjs';
import { OverlayService } from '../shared/services/overlay.service';
import { TodoFormComponent } from './todo-form/todo-form.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public todos$: Observable<Todo[]> = this.todoListStore.filteredTodos$;

  constructor(
    private todoListStore: TodoListStore,
    private overlayService: OverlayService
  ) {
    this.todos$.subscribe((todos) => console.log(todos));
  }

  public deleteTodo(id: number) {
    this.todoListStore.deleteTodo(of(id));
  }

  public updateTodo(todo: Todo) {
    this.todoListStore.updateTodo(of(todo));
  }

  public filterChanged($event: TodoFilter) {
    this.todoListStore.patchState({ filter: $event });
  }

  public addTodo() {
    const { componentInstance, overlayRef } =
      this.overlayService.open(TodoFormComponent);

    componentInstance.submitEvent.subscribe((todo: Todo) => {
      this.todoListStore.addTodo(of(todo));
      overlayRef.detach();
    });

    componentInstance.closeEvent.subscribe(() => {
      overlayRef.detach();
    });
  }
}
