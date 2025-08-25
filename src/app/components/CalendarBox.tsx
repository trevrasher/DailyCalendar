import { DailyBox } from "./DailyBox";
import { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";

  const isCurrentDay = (day: number, month:number, year:number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  

export const CalendarBox = ({ day, onClick }: {
  day: number;
  onClick: () => void;
}) => {
  const { monthTodos, monthDailies, selectedMonth, selectedYear} = useContext(CalendarContext);

    const todos = monthTodos.filter(todo =>
    todo.day === day &&
    todo.month === selectedMonth &&
    todo.year === selectedYear
  );

    const dailies = monthDailies.filter(daily =>
    daily.day === day &&
    daily.month === selectedMonth &&
    daily.year === selectedYear
  );


  return (
    <div 
      className={`calendar-box ${isCurrentDay(day, selectedMonth, selectedYear) ? 'current-day' : ''}`}
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
        <DailyBox day={day}/>
      )}
    </div>
  );
};