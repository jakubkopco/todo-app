export interface ToDoItemForm {
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

export interface ToDoItemDTO {
  id: string;
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
  In_Progress = 'in_progress'
}
