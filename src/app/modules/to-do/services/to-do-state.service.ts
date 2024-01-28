import { Injectable, signal } from '@angular/core';

import { ToDoSupabaseService } from './to-do-supabase.service';
import { ToDoItemDTO, ToDoItemForm } from '../models/to-do-item.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoStateService {
  readonly toDoItems = signal<ToDoItemDTO[]>([]);

  constructor(private readonly todoSupabaseService: ToDoSupabaseService) {
    this.fetchAllToDoItems();
  }

  async updateToDoItem(item: ToDoItemDTO): Promise<void> {
    await this.todoSupabaseService.updateToDoItem(item);
    await this.fetchAllToDoItems();
  }

  async createToDoItem(item: ToDoItemForm): Promise<void> {
    await this.todoSupabaseService.createToDoItem(item);
    await this.fetchAllToDoItems();
  }

  async deleteToDoItem(item: ToDoItemDTO): Promise<void> {
    await this.todoSupabaseService.deleteToDoItem(item);
    await this.fetchAllToDoItems();
  }

  private async fetchAllToDoItems() {
    try {
      const response = await this.todoSupabaseService.getAllToDoItems();
      if (response?.data) {
        this.toDoItems.set(this.todoSupabaseService.getSortedToDoItems(response.data));
      }
    } catch (e) {
      console.error(e);
    }
  }
}
