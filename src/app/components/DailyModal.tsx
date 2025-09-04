import { useEffect, useState } from "react";
import { useDailies, Daily } from "./usedailies";
import { useContext } from "react";
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

export const DailyModal = ({isOpen, onClose, day }: ModalProps) => {
  const { monthTodos, monthDailies, setMonthDailies, selectedMonth, selectedYear} = useContext(CalendarContext);
    const dailies = monthDailies.filter(daily =>
    daily.day === day
  );

  const {toggleDaily} = useDailies();

  if (!isOpen) return null;

  return (
  <div className="modal-overlay">
    <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Daily Tasks for {monthNames[selectedMonth]} {day}, {selectedYear}</h2>
        <div className="dailies-list">
          {dailies.map((daily) => (
            <div key={daily.id} className="daily-item">
              <span>{daily.text}</span>
              <input
                type="checkbox"
                checked={daily.completed}
                onChange={() => {
                  (setMonthDailies((prev: Daily[]) =>
                    prev.map(d =>d.id === daily.id ? { ...d, completed: !d.completed } : d))
                    ,toggleDaily(daily.id!));
                }}
                className="todo-checkbox"
              />  
            </div>
          ))}
        </div>
        <button 
          onClick={onClose} 
          className="modal-close"
        >
          Close
        </button>
      </div>
    </div>
  );
};