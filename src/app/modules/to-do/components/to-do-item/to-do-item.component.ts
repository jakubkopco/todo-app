import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {ToDoItemModel} from "../../models/toDoItem.model";
import {Subscriber} from "../../../../class/subscriber";
import {ToDoService} from "../../services/to-do.service";
import {MatListItem} from "@angular/material/list";

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [
    DatePipe,
    MatCheckbox,
    MatIcon,
    MatListItem
  ],
  template: `
    @if (toDoItem) {
      <mat-list-item>
        <div class="headerOfItem">
          <p class="titleWithDate">{{ toDoItem.title }} - {{ toDoItem.date | date: 'd.M.Y' }}</p>
          <mat-icon (click)="deleteItem()">close</mat-icon>
        </div>
        <div class="descriptionWithCheckBox">
          <p class="description">{{ toDoItem.description }}</p>
          <mat-checkbox class="example-margin"
                        [checked]="toDoItem.completed"
                        color="primary"
                        (change)="changeItemStatus($event.checked)">
          </mat-checkbox>
        </div>
      </mat-list-item>
    }
  `,
  styles: [`
    p {
      font-family: Monaco, "Lucida Console", monospace;
    }

    mat-icon {
      width: 40px;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }

    mat-list-item {
      display: block;
      margin: 1rem;
      height: 100%;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
      border-radius: 0.8rem;
    }

    .titleWithDate {
      margin: 0;
      font-size: 22px;
      font-weight: bold;
    }

    .descriptionWithCheckBox {
      display: flex;
      padding: 15px;
      align-items: center;
      justify-content: space-between;
    }

    .description {
      margin: 0;
    }

    .headerOfItem {
      display: flex;
      justify-content: space-between;
      background-color: seashell;
      padding: 10px 15px;
      border-radius: 0.8rem 0.8rem 0 0;
    }
  `]
})
export class ToDoItemComponent extends Subscriber {
  @Input() toDoItem: ToDoItemModel | undefined;
  @Output() refreshItemsEmitter: EventEmitter<void> = new EventEmitter();
  @Output() deleteItemEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private todoService: ToDoService) {
    super();
  }

  changeItemStatus(checked: boolean) {
    if (this.toDoItem) {
      this.toDoItem.completed = checked;
      this.subs.push(
        this.todoService.updateToDoItem(this.toDoItem).subscribe(() => {
          this.refreshItemsEmitter.emit();
        })
      );
    }
  }

  deleteItem() {
    if (this.toDoItem) {
      this.subs.push(
        this.todoService.deleteToDoItem(this.toDoItem).subscribe(() => {
          this.deleteItemEmitter.emit(this.toDoItem?.id);
        })
      );
    }
  }
}
