export interface Todo {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  dueAt?: Date;
  completedAt?: Date;
  isCompleted: boolean;
}
