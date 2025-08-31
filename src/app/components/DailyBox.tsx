import { useEffect, useState } from "react";
import { DailyModal } from './DailyModal'
import { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";
import { Daily } from "./usedailies";



export const DailyBox = ({ day }: { 
  day: number;
}) => {
  const { monthTodos, monthDailies, selectedMonth, selectedYear} = useContext(CalendarContext);
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);

  const dailies = monthDailies.filter(daily =>
    daily.day === day &&
    daily.month === selectedMonth &&
    daily.year === selectedYear
  );

  
  const completeDailiesCount = () => {
    const comp = (dailies.filter((daily:Daily) => daily.completed)).length;
    const total = dailies.length;
    if (total != 0) {
        return comp + " / " + total;
      }
      return "";
    
  }

  const getDailyBoxColorClass = () => {
    const complete = (dailies.filter((daily:Daily) => daily.completed)).length;
    const total = dailies.length;
    if (total === 0) {
      return "dailyBox-Red";
    }
    if ((complete / total ) === 1) {
        return "dailyBox-Green"
    }
    return "dailyBox-Red"
  }

  const handleClose = () => {
    console.log("asd");
    setIsDailyModalOpen(false);
  };
  
  return (
    
    <div className={`dailyBox-container ${getDailyBoxColorClass()}`} onClick={(e) => {
      e.stopPropagation();
      setIsDailyModalOpen(true);
    }}>
        <div className={`dailyBox-text`}>
          {completeDailiesCount()}
        </div>
      <DailyModal 
        isOpen={isDailyModalOpen}
        onClose={handleClose}
        day={day}
      />
    </div>
  );
};