import { useEffect, useState } from "react";
import { useDailies } from "./usedailies";

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

export const DailyModal = ({isOpen, onClose, day, month, year }: ModalProps) => {
  const [dailies, setDailies] = useState<any[]>([]);
  const {toggleDaily} = useDailies(day, month, year);

  useEffect(() => {
    const fetchDailies = async () => {
      try {
        const response = await fetch(
          `/api/dailies?day=${day}&month=${month}&year=${year}`
        );
        const data = await response.json();
        setDailies(data);
      } catch (error) {
        console.error('Failed to fetch dailies:', error);
      }
    };
    if (isOpen) {
      fetchDailies();
    }
  }, [day, month, year, isOpen]);

  if (!isOpen) return null;

  return (
  <div className="modal-overlay">
    <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Daily Tasks for {monthNames[month]} {day}, {year}</h2>
        <div className="dailies-list">
          {dailies.map((daily) => (
            <div key={daily.id} className="daily-item">
              <span>{daily.text}</span>
              <input
                type="checkbox"
                checked={daily.completed}
                onChange={() => toggleDaily(daily.id)}
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