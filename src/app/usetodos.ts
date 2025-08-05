import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function useTodos() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn Next.js', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
  ]);

  

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    setTodos([
      ...todos,
      { id: todos.length + 1, text: newTodo, completed: false }
    ]);
    setNewTodo('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    deleteTodo
  };
}