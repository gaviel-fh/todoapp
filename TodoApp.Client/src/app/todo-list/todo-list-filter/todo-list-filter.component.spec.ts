import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListFilterComponent } from './todo-list-filter.component';

describe('TodoListFilterComponent', () => {
  let component: TodoListFilterComponent;
  let fixture: ComponentFixture<TodoListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
