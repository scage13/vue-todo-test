export type Todo = {
  id: string;
  createdAt: string;
  title: string | null;
  tasks: TodoTask[];
}

export type TodoTask = {
  label: string;
  done: boolean;
}
