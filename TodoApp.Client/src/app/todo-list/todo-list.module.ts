import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { ListContainerComponent } from './list-container/list-container.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [TodoListComponent, ListContainerComponent, TodoItemComponent],
  imports: [CommonModule],
  exports: [TodoListComponent],
})
export class TodoListModule {}
