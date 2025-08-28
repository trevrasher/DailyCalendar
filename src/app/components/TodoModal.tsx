import { useState, useEffect } from "react";
import { useContext } from "react";
import { useTodos, Todo} from "./usetodos";
import { CalendarContext } from "../context/CalendarContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: number;

}

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

export const TodoModal = ({ isOpen, onClose, day }: ModalProps) => {
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
const { monthTodos, setMonthTodos, selectedMonth, selectedYear} = useContext(CalendarContext);
const { deleteTodo,addTodo,toggleTodo } = useTodos( selectedMonth, selectedYear);

  const todos = monthTodos.filter(todo =>
    todo.day === day &&
    todo.month === selectedMonth &&
    todo.year === selectedYear
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodoObj: Todo = {
        id: Date.now(), 
        text: newTodo,
        day,
        month: selectedMonth,
        year: selectedYear,
        completed: false,
    };
      setMonthTodos((prev:Todo[]) => [...prev, newTodoObj])
      setNewTodo('');
      addTodo(newTodo, day);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{monthNames[selectedMonth]} {day}, {selectedYear}</h2>
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo..."
            className="todo-input"
          />
          <button type="submit" className="todo-button">Add</button>
        </form>
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item"> 
              <input
                type="checkbox"
                checked={!!todo.completed}
                onChange={() => (toggleTodo(todo.id), setMonthTodos((prev:Todo[]) => prev.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t)) )}
                className="todo-checkbox"
              />
              <span>{todo.text}</span>
              <button onClick={() => (setMonthTodos((prev:Todo[]) => prev.filter(t => t.id !== todo.id)), deleteTodo(todo.id))}>Delete</button>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="modal-close">Close</button>
      </div>
    </div>
  );
};