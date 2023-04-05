import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { ListContainerComponent } from './list-container/list-container.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListFilterComponent } from './todo-list-filter/todo-list-filter.component';

@NgModule({
  declarations: [
    TodoListComponent,
    ListContainerComponent,
    TodoItemComponent,
    TodoListFilterComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [TodoListComponent],
})
export class TodoListModule {}
