import {Injectable} from '@angular/core';
import {SupabaseService} from "../../../shared/services/supabase.service";
import {from, map, Observable} from "rxjs";
import {ToDoItemModel} from "../models/toDoItem.model";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private readonly supabaseService: SupabaseService) {
  }

  getAllToDoItems(owner: string): Observable<ToDoItemModel[]> {
    return from(this.supabaseService.client
      .from('Todo')
      .select('*')
      .eq('owner', owner)).pipe(
      map(item => item.data as unknown as ToDoItemModel[])
    );
  }

  createToDoItem(item: ToDoItemModel) {
    return from(this.supabaseService.client
      .from('Todo')
      .insert(item)
      .then(() => { console.log('Success. Todo was created') }));
  }

  updateToDoItem(item: ToDoItemModel) {
    return from(this.supabaseService.client
      .from('Todo')
      .update(item)
      .eq('owner', item.owner)
      .eq('id', item.id)
      .then(() => { console.log('Success. Todo was updated') }));
  }

  deleteToDoItem(item: ToDoItemModel) {
    return from(this.supabaseService.client
      .from('Todo')
      .delete()
      .eq('owner', item.owner)
      .eq('id', item.id)
      .then(() => { console.log('Success. Todo was deleted') }));
  }
}
