"use client";
import { CalendarProvider, CalendarContext } from './context/CalendarContext';
import { useState, useEffect, useContext } from 'react';
import { TemplateList } from './components/TemplateList'
import { TodoModal } from './components/TodoModal'
import { CalendarBox } from './components/CalendarBox';
import { useTodos, Todo } from './components/usetodos';
import { useDailies, Daily} from './components/usedailies';

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};




export default function Page() {
  return (
    <CalendarProvider>
      <CalendarPageContent />
    </CalendarProvider>
  );
}

function CalendarPageContent() {
  const {
    monthDailies,
    setMonthDailies,
    monthTodos,
    setMonthTodos,
    selectedDay,
    setSelectedDay,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
  } = useContext(CalendarContext);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };
  
  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

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
          <h2>{monthNames[selectedMonth]} {selectedYear}</h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
      <main className="grid-container">
        
  {dayNames.map(name => (
    <div key={name} className="day-header">
      {name}
    </div>
  ))}

  {[...Array(getFirstDayOfMonth(selectedMonth, selectedYear))].map((_, index) => (
    <div key={`empty-${index}`} className="calendar-box empty" />
  ))}
  
  {[...Array(getDaysInMonth(selectedMonth, selectedYear))].map((_, index) => (
    <CalendarBox
      key={index}
      day={index + 1}
      onClick={() => handleDayClick(index + 1)}
    />
  ))}
    </main>
     <TodoModal 
      isOpen={selectedDay !== null}
      onClose={() => setSelectedDay(null)}
      day={selectedDay ?? 0}
    />
    </>
  );
}

