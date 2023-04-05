// todo-list-filter.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface TodoFilter {
  title: string | null;
  dueAt: Date | null;
  createdAt: Date | null;
  isCompleted: boolean | null;
  priority: string | null;
}

@Component({
  selector: 'app-todo-list-filter',
  templateUrl: './todo-list-filter.component.html',
  styleUrls: ['./todo-list-filter.component.scss'],
})
export class TodoListFilterComponent {
  @Output() filtersChanged = new EventEmitter<TodoFilter>();
  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      title: [''],
      dueAt: [''],
      createdAt: [''],
      isCompleted: [''],
      priority: [''],
    });

    this.filterForm.valueChanges.subscribe((value) => {
      this.filtersChanged.emit({
        title: value.title,
        dueAt: value.dueAt ? new Date(value.dueAt) : null,
        createdAt: value.createdAt ? new Date(value.createdAt) : null,
        isCompleted: this.isCompleted(value.isCompleted),
        priority: value.priority || null,
      });
    });
  }

  private isCompleted(isCompleted: string): boolean | null {
    if (isCompleted === 'true') return true;
    if (isCompleted === 'false') return false;
    return null;
  }
}
