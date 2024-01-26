import {Component, EventEmitter, Output} from '@angular/core';
import {ToDoItemStatus} from "../../models/toDoItem.model";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-to-do-filter-selector',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    ReactiveFormsModule
  ],
  template: `
    <hr>
    <div class="filterSelectorWrapper">
      <input type="text" [formControl]="searchControl" placeholder="Search...">
      <mat-button-toggle-group name="selectedFilter" aria-label="Selected filter"
                               [value]="ToDoItemStatusModel.All">
        <mat-button-toggle [value]="ToDoItemStatusModel.All"
                           (click)="selectFilter(ToDoItemStatusModel.All)">All
        </mat-button-toggle>
        <mat-button-toggle [value]="ToDoItemStatusModel.InProgress"
                           (click)="selectFilter(ToDoItemStatusModel.InProgress)">In progress
        </mat-button-toggle>
        <mat-button-toggle [value]="ToDoItemStatusModel.Completed"
                           (click)="selectFilter(ToDoItemStatusModel.Completed)">Completed
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <hr>
  `,
  styles: [
    `
      input {
        border: 1px solid #e0e0e0;
        border-radius: 0.8rem;
        padding-inline: 10px;
      }
      hr {
        border: none;
        border-top: 1px solid #e0e0e0;
        margin: 0 !important;
      }
      mat-button-toggle-group {
        border-radius: 0.8rem !important;
      }
      .filterSelectorWrapper {
        display: flex;
        justify-content: space-between;
        padding: 15px;
      }
    `
  ]
})
export class ToDoFilterSelectorComponent {
  public searchControl: FormControl = new FormControl();
  protected readonly ToDoItemStatusModel = ToDoItemStatus;
  @Output() selectedFilterEmitter: EventEmitter<ToDoItemStatus> = new EventEmitter();
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.searchControl.valueChanges.subscribe(value => this.searchEmitter.emit(value));
  }

  selectFilter(status: ToDoItemStatus) {
    this.selectedFilterEmitter.emit(status);
  }
}
