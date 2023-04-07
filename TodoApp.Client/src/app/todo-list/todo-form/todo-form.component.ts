import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OVERLAY_CONTEXT_DATA,
  OverlayContext,
} from 'src/app/shared/services/overlay.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  public todoForm: FormGroup = {} as FormGroup;
  @Output()
  public submitEvent: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  public closeEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(OVERLAY_CONTEXT_DATA) private context: OverlayContext
  ) {}

  ngOnInit(): void {
    const todo: Todo = (this.context as Todo) || {};
    this.todoForm = this.formBuilder.group({
      id: [todo.id],
      title: [todo.title, Validators.required],
      description: [todo.description],
      createdAt: [
        this.formatDateForInput(todo.createdAt || new Date()),
        Validators.required,
      ],
      dueAt: [this.formatDateForInput(todo.dueAt)],
      completedAt: [this.formatDateForInput(todo.completedAt)],
      isCompleted: [todo.isCompleted],
      priority: [todo.priority ?? 'normal', Validators.required],
    });
  }

  public submit(): void {
    if (this.todoForm.invalid) return;

    this.submitEvent.emit(this.todoForm.value);
  }

  public close(): void {
    this.closeEvent.emit();
  }

  private formatDateForInput(date: Date | null | undefined): string {
    if (!date) {
      return '';
    }

    const localDateTime = new Date(date);
    localDateTime.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return localDateTime.toISOString().slice(0, 16);
  }
}
