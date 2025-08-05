"use client";
import { useTodos } from './usetodos';
import { useState } from 'react';
import Link from 'next/link'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;  // Function that takes no args and returns nothing
  day: number;
  todos: Todo[];
}



const Modal = ({ isOpen, onClose, day }: ModalProps) => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, deleteTodo } = useTodos();  

  if (!isOpen) return null;

   return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Day {day}</h2>
         <form onSubmit={addTodo} className="todo-form">
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
                checked={todo.completed}
                onChange={() => {
                  todo.completed = !todo.completed;
                }}
              />
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))} 
        </div>                    
        <button onClick={onClose} className="modal-close">
          Close
        </button>
      </div>
    </div>
  );


};

export default function Page() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <>
      <header className="header-container">
        <h1 className="header-title">calendar</h1>
        <Link href="/checklist" className="nav-button">
          Go to Checklist
        </Link>
      </header>
      <main className="grid-container">
        {[...Array(30)].map((_, index) => (
          <div 
            key={index}
            className="calendar-box"
            onClick={() => handleDayClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </main>
      <Modal 
        isOpen={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        day={selectedDay ?? 0}
      />
    </>
  );
}

