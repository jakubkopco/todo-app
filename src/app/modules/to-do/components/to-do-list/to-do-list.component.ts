import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

import { ToDoItemsStore } from '../../to-do.store';
import { ToDoItemDTO, ToDoItemStatus } from '../../models/to-do-item.model';
import { ToDoFilterSelectorComponent } from '../to-do-filter-selector/to-do-filter-selector.component';
import { ToDoItemComponent } from '../to-do-item/to-do-item.component';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    MatIcon,
    MatLabel,
    CommonModule,
    MatIconButton,
    MatInput,
    MatCheckbox,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    ScrollingModule,
    ToDoFilterSelectorComponent,
    ToDoItemComponent
  ],
  templateUrl: './to-do-list.component.html'
})
export class ToDoListComponent {
  private readonly selectedFilter = signal<ToDoItemStatus>(ToDoItemStatus.All);
  private readonly searchQuery = signal<string>('');
  readonly store = inject(ToDoItemsStore);
  protected toDoItems = this.store.toDoItems;

  protected itemSize = computed(() => this.toDoItems().length);
  protected filteredToDoItems = computed(() => {
    const items = this.toDoItems().filter(
      item => item.title.toLowerCase().includes(this.searchQuery()) || item.description.toLowerCase().includes(this.searchQuery())
    );
    switch (this.selectedFilter()) {
      case ToDoItemStatus.In_Progress:
        return items.filter(item => !item.completed);
      case ToDoItemStatus.Completed:
        return items.filter(item => item.completed);
      default:
        return items;
    }
  });

  searchItems(query: string) {
    this.searchQuery.set(query.toLowerCase().trim());
  }

  filterItems(status: ToDoItemStatus) {
    this.selectedFilter.set(status);
    this.searchItems(this.searchQuery());
  }
  async onUpdateItem(item: ToDoItemDTO): Promise<void> {
    await this.store.updateToDoItem(item);
  }

  async onDeleteItem(item: ToDoItemDTO): Promise<void> {
    await this.store.deleteToDoItem(item);
  }

  trackByFn(index: number, item: ToDoItemDTO) {
    return item.id;
  }
}
