import { Component, Input, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent<T> {
  @Input()
  public items: T[] = [];
  @Input()
  public itemTemplate!: TemplateRef<unknown>;
}
