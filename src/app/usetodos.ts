import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  day: number;
  month: number;
  year: number;
  
}

export function useTodos(day: number, month: number, year: number) {
  const [todos, setTodos] = useState<Todo[]>([]);

   useEffect(() => {
    fetchTodos();
  }, [day, month, year]);

  const fetchTodos = async () => {
    const response = await fetch(`/api/todos?day=${day}&month=${month}&year=${year}`);
    const data = await response.json();
    setTodos(data);
  };
  

const addTodo = async (text: string) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, day, month, year, completed: false }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return {
    todos,
    addTodo,
    deleteTodo,  
  };
}