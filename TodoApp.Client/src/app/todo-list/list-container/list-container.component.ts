import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent<T> {
  @Input()
  items: T[] = [];
  @Input()
  itemTemplate!: TemplateRef<unknown>;
}
