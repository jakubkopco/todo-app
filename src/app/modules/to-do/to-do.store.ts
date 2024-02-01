import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { ToDoItemDTO, ToDoItemForm } from './models/to-do-item.model';
import { ToDoSupabaseService } from './services/to-do-supabase.service';

type ToDoItemsState = {
  toDoItems: ToDoItemDTO[];
};
export const ToDoItemsStore = signalStore(
  withState<ToDoItemsState>({
    toDoItems: []
  }),
  withMethods((store, toDoSupabaseService = inject(ToDoSupabaseService)) => ({
    async updateToDoItem(item: ToDoItemDTO): Promise<void> {
      await toDoSupabaseService.updateToDoItem(item);
      await this.fetchAllToDoItems();
    },
    async createToDoItem(item: ToDoItemForm): Promise<void> {
      await toDoSupabaseService.createToDoItem(item);
      await this.fetchAllToDoItems();
    },
    async deleteToDoItem(item: ToDoItemDTO): Promise<void> {
      await toDoSupabaseService.deleteToDoItem(item);
      await this.fetchAllToDoItems();
    },
    async fetchAllToDoItems() {
      try {
        const response = await toDoSupabaseService.getAllToDoItems();
        if (response?.data) {
          patchState(store, { toDoItems: toDoSupabaseService.getSortedToDoItems(response.data) });
        }
      } catch (e) {
        console.error(e);
      }
    }
  })),
  withHooks({
    onInit(store) {
      store.fetchAllToDoItems();
    }
  })
);
