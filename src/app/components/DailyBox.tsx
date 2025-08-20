import { useEffect, useState } from "react";
import { DailyModal } from './DailyModal'

export const DailyBox = ({ day, month, year }: { 
  day: number;
  month: number;
  year: number;
}) => {
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [todayDailies, setTodayDailies] = useState<any[]>([]);
  const fetchTodayDailies = async () => {
    const res = await fetch(`/api/dailies?day=${day}&month=${month}&year=${year}`);
    const data = await res.json();
    setTodayDailies(data);
  };
  useEffect(() => {
  fetchTodayDailies();
  }, [day, month, year]);
  
  
  const completeDailiesCount = () => {
    const comp = (todayDailies.filter((daily:any) => daily.completed)).length;
    const total = todayDailies.length;
    if (total != 0) {
        return comp + " / " + total;
      }
      return "";
    
  }

  const getDailyBoxColorClass = () => {
    const complete = (todayDailies.filter((daily:any) => daily.completed)).length;
    const total = todayDailies.length;
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
        month={month}
        year={year}
      />
    </div>
  );
};