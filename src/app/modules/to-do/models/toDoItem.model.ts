export interface ToDoItemModel {
  id?: string;
  created_at: Date;
  owner: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

export enum ToDoItemStatus {
  All = 'all',
  Completed = 'completed',
  InProgress = 'inProgress'
}
