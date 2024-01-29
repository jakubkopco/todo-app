import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatListItem } from '@angular/material/list';

import { ToDoItemDTO } from '../../models/to-do-item.model';

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [DatePipe, MatCheckbox, MatIcon, MatListItem, MatIconButton],
  template: `
    <mat-list-item>
      <div class="header">
        <p class="title-with-date">{{ toDoItem.title }} - {{ toDoItem.date | date: 'd.M.Y' }}</p>
        <button mat-icon-button (click)="deleteButtonClicked()"><mat-icon>close</mat-icon></button>
      </div>
      <div class="description-with-checkbox">
        <p class="description">{{ toDoItem.description }}</p>
        <mat-checkbox class="example-margin" [checked]="toDoItem.completed" color="primary" (change)="changeItemStatus($event.checked)">
        </mat-checkbox>
      </div>
    </mat-list-item>
  `,
  styles: [
    `
      p {
        font-family: Monaco, 'Lucida Console', monospace;
      }

      .title-with-date {
        align-self: center;
        margin: 0;
        font-size: 22px;
        font-weight: bold;
      }

      .description-with-checkbox {
        display: flex;
        padding: 15px;
        align-items: center;
        justify-content: space-between;
      }

      .description {
        margin: 0;
      }

      .header {
        display: flex;
        justify-content: space-between;
        background-color: seashell;
        padding: 10px 15px;
        border-radius: 0.8rem 0.8rem 0 0;
      }
    `
  ]
})
export class ToDoItemComponent {
  @Input({ required: true }) toDoItem: ToDoItemDTO;
  @Output() updateItem: EventEmitter<ToDoItemDTO> = new EventEmitter<ToDoItemDTO>();
  @Output() deleteItem: EventEmitter<ToDoItemDTO> = new EventEmitter<ToDoItemDTO>();

  async changeItemStatus(checked: boolean) {
    this.toDoItem.completed = checked;
    try {
      this.updateItem.emit(this.toDoItem);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteButtonClicked() {
    try {
      this.deleteItem.emit(this.toDoItem);
    } catch (e) {
      console.error(e);
    }
  }
}
