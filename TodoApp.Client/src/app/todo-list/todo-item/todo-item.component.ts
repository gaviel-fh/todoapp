import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  public todo?: Todo;
  @Output()
  public update = new EventEmitter<Todo>();
  @Output()
  public delete = new EventEmitter<number>();

  onUpdate() {
    if (this.todo == null) return;

    this.update.emit(this.todo);
  }

  onDelete() {
    if (this.todo == null) return;

    this.delete.emit(this.todo.id);
  }
}
