import { useEffect, useState, useContext, useRef } from "react";
import { useTemplates, Template } from "./usetemplates";
import { CalendarContext } from "../context/CalendarContext";
import { useDailies, Daily } from "./usedailies";


export const TemplateList = () => {
  const { templates, addTemplate, deleteTemplate } = useTemplates();
  const [newTemplate, setNewTemplate] = useState('');

  const {  monthDailies, selectedMonth, selectedYear} = useContext(CalendarContext);
  const { addDailies, toggleDaily, deleteDaily } = useDailies();


  const toggleTodayDailyByText = (text: string) => {
    const daily = monthDailies.find((d: Daily) => d.text === text && d.day === new Date().getDate());
    if (!daily) return;
    if(daily.id!== undefined) {
    toggleDaily(daily.id);
    }
  };

useEffect(() => {
  createNewDailies();
}, [templates]);


function templateHasDailyForToday(template: Template) {
  const today = new Date();
  return monthDailies.some(d =>
    d.text === template.text &&
    d.day === today.getDate() &&
    d.month === today.getMonth() &&
    d.year === today.getFullYear()
  );
}
const createNewDailies = () => {
  const todayDay = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  
  console.log('=== DEBUG: Creating dailies ===');
  console.log('Today:', { day: todayDay, month: todayMonth, year: todayYear });
  console.log('Selected:', { month: selectedMonth, year: selectedYear });
  console.log('Templates count:', templates.length);
  console.log('Templates:', templates.map(t => ({ id: t.id, text: t.text })));
  console.log('Month dailies count:', monthDailies.length);
  console.log('Month dailies:', monthDailies.map(d => ({ id: d.id, text: d.text, day: d.day, month: d.month, year: d.year })));
  
  const newDailies: Omit<Daily, 'id'>[] = (templates
    .filter(template => {
      const hasDaily = templateHasDailyForToday(template);
      const isCurrentMonth = selectedMonth === todayMonth;
      const isCurrentYear = selectedYear === todayYear;
      
      console.log(`Template "${template.text}":`, {
        hasDaily,
        isCurrentMonth,
        isCurrentYear,
        willCreateDaily: !hasDaily && isCurrentMonth && isCurrentYear
      });
      
      return !hasDaily && isCurrentMonth && isCurrentYear;
    })
    .map(template => ({
      text: template.text,
      completed: false,
      day: todayDay,
      month: selectedMonth,
      year: selectedYear,
    })));
    
  console.log('New dailies to create:', newDailies);
  
  if (newDailies.length > 0) {
    console.log('Calling addDailies with:', newDailies);
    addDailies(newDailies);
  } else {
    console.log('No new dailies to create');
  }
  console.log('=== END DEBUG ===');
}



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTemplate.trim()) {
      addTemplate(newTemplate);
      setNewTemplate('');
    }
  }

  return (
    <div className="template-container">
      <h2 className="dailies-header">dailies</h2>
      <form onSubmit={handleSubmit} className="template-form">
        <input
          type="text"
          value={newTemplate}
          onChange={(e) => setNewTemplate(e.target.value)}
          placeholder="Add new daily..."
          className="template-input"
        />
        <button type="submit" className="template-add">Add</button>
      </form>
      <div className="template-list">
        {templates.map((template) => (
          <div key={template.id} className="template-item">
              <input
              type="checkbox"
              checked={!!monthDailies.find(d => d.text === template.text && d.completed && d.day === new Date().getDate())}
              onChange={() => toggleTodayDailyByText(template.text)}
              className="daily-checkbox"
            />
            <span className="template-text">{template.text}</span>
            <button
              className="delete-button"
              onClick={() => {
                deleteTemplate(template.id);
                const dailyToDelete = monthDailies.find(
                  d => d.text === template.text && d.day === new Date().getDate()
                );
                if (dailyToDelete && dailyToDelete.id !== undefined) {
                  deleteDaily(dailyToDelete.id);
                }
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );

};

