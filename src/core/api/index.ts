import { db } from '@/firebase'

// Consts
import { COLLECTION_NAME } from '../consts/consts'

// Types
import { Todo } from '../types/todo'

// Get all todos
export async function fetchAllTodos (): Promise<Todo[] | undefined> {
  try {
    const data = await db
      .collection(COLLECTION_NAME)
      .get()

    return data.docs.map(doc => doc.data() as Todo)
  } catch (error) {
    console.warn(error)
  }
}

// Get todo by id
export async function getTodoById (id: string): Promise<Todo | undefined> {
  try {
    const todo = await db
      .collection(COLLECTION_NAME)
      .doc(id)
      .get()

    return todo.data() as Todo
  } catch (error) {
    console.warn(error)
  }
}

// Update todo
export async function updateTodoById (payload: Todo) {
  try {
    const todo = await db
      .collection(COLLECTION_NAME)
      .doc(payload.id)
      .update(payload)

    return todo
  } catch (error) {
    console.warn(error)
  }
}

// Create New Todo
export async function createTodo (payload: Todo) {
  try {
    const todo = await db
      .collection(COLLECTION_NAME)
      .doc(payload.id)
      .set(payload)

    return todo
  } catch (error) {
    console.warn(error)
  }
}

// Delete Todo
export async function deleteTodoById (id: string) {
  try {
    const todo = await db
      .collection(COLLECTION_NAME)
      .doc(id)
      .delete()

    return todo
  } catch (error) {
    console.warn()
  }
}
