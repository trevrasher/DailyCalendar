"use client";
import { useTodos } from './usetodos';
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// popup box
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: number;
  month: number;
  year: number;
}

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];



const Modal = ({ isOpen, onClose, day, month, year }: ModalProps) => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, deleteTodo } = useTodos(day, month, year);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{monthNames[month]} {day}, {year}</h2>
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
                checked={todo.completed}
                onChange={() => {}}
              />
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="modal-close">Close</button>
      </div>
    </div>
  );
};

export default function Page() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const isCurrentDay = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };
  
  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const CalendarBox = ({ day, month, year, onClick }: {
  day: number;
  month: number;
  year: number;
  onClick: () => void;
}) => {
  const { todos } = useTodos(day, month, year);

  return (
    <div 
      className={`calendar-box ${isCurrentDay(day) ? 'current-day' : ''}`}
      onClick={onClick}
    >
      <div className="calendar-date">{day}</div>
      <div className="todo-preview">
        {todos.slice(0, 2).map((todo) => (
          <div 
            key={todo.id} 
            className={`todo-preview-item ${todo.completed ? 'completed' : ''}`}
          >
            • {todo.text}
          </div>
        ))}
        {todos.length > 2 && (
          <div className="todo-preview-more">+{todos.length - 2} more</div>
        )}
      </div>
    </div>
  );
};

  return (
    <>
      <header className="header-container">
        <h1 className="header-title">calendar</h1>
      </header>
      <div className="calendar-nav">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h2>{monthNames[currentMonth]} {currentYear}</h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
      <main className="grid-container">
  {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, index) => (
    <CalendarBox
      key={index}
      day={index + 1}
      month={currentMonth}
      year={currentYear}
      onClick={() => handleDayClick(index + 1)}
    />
  ))}
    </main>
     <Modal 
      isOpen={selectedDay !== null}
      onClose={() => setSelectedDay(null)}
      day={selectedDay ?? 0}
      month={currentMonth}
      year={currentYear}
    />
    </>
  );
}

