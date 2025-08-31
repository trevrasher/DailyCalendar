import { useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  day: number;
  month: number;
  year: number;
}

export function useTodos() {
  const {
    monthTodos,
    setMonthTodos,
    selectedMonth,
    selectedYear,

  } = useContext(CalendarContext);

  const fetchTodos = async () => {
    const response = await fetch(`/api/todos/?month=${selectedMonth}&year=${selectedYear}`);
    const data = await response.json();
    setMonthTodos(data);
  };

  const addTodo = async (text: string, day: number) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, month: selectedMonth, year: selectedYear, day, completed: false }),
    });
    const newTodo = await response.json();
    setMonthTodos([...monthTodos, newTodo]);
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMonthTodos(monthTodos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todoToUpdate = monthTodos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          completed: !todoToUpdate.completed
        }),
      });

      if (response.ok) {
        setMonthTodos(monthTodos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  return {
    addTodo,
    deleteTodo,
    toggleTodo,
    fetchTodos,
  };
}