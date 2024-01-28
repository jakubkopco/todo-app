import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';

import { ToDoItemStatus } from '../../models/to-do-item.model';

@Component({
  selector: 'app-to-do-filter-selector',
  standalone: true,
  imports: [MatButtonToggleGroup, MatButtonToggle, ReactiveFormsModule],
  template: `
    <hr />
    <div class="filter-selector-wrapper">
      <input type="text" [formControl]="searchControl" placeholder="Search..." />
      <mat-button-toggle-group name="selectedFilter" aria-label="Selected filter" [value]="toDoItemStatus.All">
        <mat-button-toggle [value]="toDoItemStatus.All" (click)="selectFilter.emit(toDoItemStatus.All)">All </mat-button-toggle>
        <mat-button-toggle [value]="toDoItemStatus.In_Progress" (click)="selectFilter.emit(toDoItemStatus.In_Progress)"
          >In progress
        </mat-button-toggle>
        <mat-button-toggle [value]="toDoItemStatus.Completed" (click)="selectFilter.emit(toDoItemStatus.Completed)"
          >Completed
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <hr />
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

      .filter-selector-wrapper {
        display: flex;
        justify-content: space-between;
        padding: 15px;
      }

      @media screen and (max-width: 600px) {
        .filter-selector-wrapper {
          flex-direction: column;
        }
        input {
          height: 2.5rem;
          margin-bottom: 10px;
        }
        mat-button-toggle {
          display: flex;
          width: 100%;
        }
      }
    `
  ]
})
export class ToDoFilterSelectorComponent {
  protected readonly searchControl: FormControl = new FormControl();
  protected readonly toDoItemStatus = ToDoItemStatus;
  @Output() selectFilter = new EventEmitter<ToDoItemStatus>();
  @Output() search = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => this.search.emit(value));
  }
}
