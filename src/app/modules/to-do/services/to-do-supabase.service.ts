import { Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

import { SupabaseService } from '../../../shared/services/supabase.service';
import { AuthService } from '../../auth/services/auth.service';
import { ToDoItemDTO, ToDoItemForm } from '../models/to-do-item.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoSupabaseService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly authService: AuthService
  ) {}

  async getAllToDoItems(): Promise<PostgrestSingleResponse<ToDoItemDTO[]> | undefined> {
    if (this.authService.user() !== null) {
      return this.supabaseService.client.from('Todo').select('*').eq('owner', this.authService.user()?.id);
    }
    return undefined;
  }

  async createToDoItem(item: ToDoItemForm) {
    return this.supabaseService.client.from('Todo').insert({ ...item, owner: this.authService.user()?.id, completed: false });
  }

  async updateToDoItem(item: ToDoItemDTO) {
    return this.supabaseService.client.from('Todo').update(item).eq('owner', item.owner).eq('id', item.id);
  }

  async deleteToDoItem(item: ToDoItemDTO) {
    return this.supabaseService.client.from('Todo').delete().eq('owner', item.owner).eq('id', item.id);
  }

  getSortedToDoItems(items: ToDoItemDTO[]): ToDoItemDTO[] {
    return items.sort((a: ToDoItemDTO, b: ToDoItemDTO) => (a.created_at < b.created_at ? -1 : 1));
  }
}
