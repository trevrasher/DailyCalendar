import { useEffect, useState } from "react";
import { useTodos } from "./usetodos";
import { DailyBox } from "./DailyBox";


  const isCurrentDay = (day: number, month:number, year:number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };
  

export const CalendarBox = ({ day, month, year, onClick }: {
  day: number;
  month: number;
  year: number;
  onClick: () => void;
}) => {
  const { todos } = useTodos(day, month, year);
  const [dailies, setDailies] = useState<any[]>([]);
  const fetchDailies = async () => {
    const res = await fetch(`/api/dailies?day=${day}&month=${month}&year=${year}`);
    const data = await res.json();
    setDailies(data);
      }
  useEffect(() => {
    fetchDailies();
  }, [day, month, year]);


  return (
    <div 
      className={`calendar-box ${isCurrentDay(day, month, year) ? 'current-day' : ''}`}
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
      {dailies.length > 0 && (
        <DailyBox day={day} month={month} year={year} />
      )}
    </div>
  );
};