"use client";
import { useState, useEffect } from 'react';
import { TemplateList } from './components/TemplateList'
import { TodoModal } from './components/TodoModal'
import { CalendarBox } from './components/CalendarBox';
import { useTodos, Todo } from './components/usetodos';

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};




export default function Page() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const { todos } = useTodos((new Date().getDay()), currentMonth, currentYear).fetchMonthTodos();
  const todosByDay: { [key: number]: Todo[] } = {};
  todos.forEach((todo: any) => {
    if (!todosByDay[todo.day]) {
      todosByDay[todo.day] = [];
    }
    todosByDay[todo.day].push(todo);
  });

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

useEffect(() => {
    const createDailies = async () => {
      try {
        const response = await fetch('/api/dailies');
        const data = await response.json();
        console.log('Dailies created:', data);
      } catch (error) {
        console.error('Failed to create dailies:', error);
      }
    };
    createDailies();
  }); 

  return (
    <>
      <header className="header-container">
        <h1 className="header-title">calendar</h1>
      </header>
      <div className="templates">
      <TemplateList />
      </div>
      <div className="calendar-nav">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h2>{monthNames[currentMonth]} {currentYear}</h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
      <main className="grid-container">
  {/* Add day name headers */}
  {dayNames.map(name => (
    <div key={name} className="day-header">
      {name}
    </div>
  ))}

    {/* Add empty cells for padding */}
  {[...Array(getFirstDayOfMonth(currentMonth, currentYear))].map((_, index) => (
    <div key={`empty-${index}`} className="calendar-box empty" />
  ))}
  
  {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, index) => (
    <CalendarBox
      key={index}
      day={index + 1}
      month={currentMonth}
      year={currentYear}
      todos={todosByDay[index + 1] ?? []}
      onClick={() => handleDayClick(index + 1)}
    />
  ))}
    </main>
     <TodoModal 
      isOpen={selectedDay !== null}
      onClose={() => setSelectedDay(null)}
      day={selectedDay ?? 0}
      month={currentMonth}
      year={currentYear}
    />
    </>
  );
}


