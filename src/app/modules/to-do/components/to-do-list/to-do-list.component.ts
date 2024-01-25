import {Component, Input} from '@angular/core';
import {MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ToDoItemModel, ToDoItemStatus} from "../../models/toDoItem.model";
import {MatCheckbox} from "@angular/material/checkbox";
import {ToDoService} from "../../services/to-do.service";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {ToDoFilterSelectorComponent} from "../to-do-filter-selector/to-do-filter-selector.component";
import {MatListItem} from "@angular/material/list";
import {map, Observable, of} from "rxjs";
import {Subscriber} from "../../../../class/subscriber";

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
    ToDoFilterSelectorComponent,
    MatListItem
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent extends Subscriber {
  public toDoItems: ToDoItemModel[] = [];
  private selectedFilter: ToDoItemStatus = ToDoItemStatus.All;
  public filteredToDoItems$: Observable<ToDoItemModel[]> | undefined;
  private searchQuery: string = '';

  @Input('toDoItems')
  set setToDoItems(items: ToDoItemModel[]) {
    if (items) {
      this.toDoItems = items;
      this.filterItems(this.selectedFilter);
    }
  }

  constructor(private readonly todoService: ToDoService) {
    super();
  }

  searchItems(query: string) {
    this.searchQuery = query.toLowerCase().trim();
    this.filteredToDoItems$ = of(this.toDoItems.filter(item =>
      item.title.toLowerCase().includes(this.searchQuery) || item.description.toLowerCase().includes(this.searchQuery)
    ));
  }

  changeItemStatus(checked: boolean, id: string) {
    const item = this.toDoItems.find(item => item.id === id);
    if (item) {
      item.completed = checked;
      this.subs.push(
        this.todoService.updateToDoItem(item).subscribe(() => {
          this.refreshItems();
        })
      );
    }
  }

  deleteItem(id: string) {
    const item = this.toDoItems.find(item => item.id === id);
    if (item) {
      this.subs.push(
        this.todoService.deleteToDoItem(item).subscribe(() => {
          this.toDoItems = this.toDoItems.filter(item => item.id !== id);
          this.refreshItems();
        })
      );
    }
  }

  filterItems(status: ToDoItemStatus) {
    this.selectedFilter = status;
    this.searchItems(this.searchQuery);
    switch (status) {
      case ToDoItemStatus.InProgress:
        this.filteredToDoItems$ = this.filteredToDoItems$?.pipe(
          map(items => items.filter(item => !item.completed))
        );
        break;
      case ToDoItemStatus.Completed:
        this.filteredToDoItems$ = this.filteredToDoItems$?.pipe(
          map(items => items.filter(item => item.completed))
        );
        break;
    }
  }

  refreshItems() {
    setTimeout(() => {
      this.filterItems(this.selectedFilter);
    }, 300);
  }
}
