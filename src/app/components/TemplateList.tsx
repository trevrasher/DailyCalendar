import { useEffect, useState } from "react";
import { useTemplates, Template } from "./usetemplates";
import { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";
import { useDailies, Daily } from "./usedailies";


export const TemplateList = () => {
  const { templates, addTemplate, deleteTemplate } = useTemplates();
  const [newTemplate, setNewTemplate] = useState('');

  const {  monthDailies, selectedMonth, selectedYear} = useContext(CalendarContext);
  const { addDaily, toggleDaily, deleteDaily } = useDailies();


  const toggleTodayDailyByText = (text: string) => {
    const daily = monthDailies.find((d: any) => d.text === text && d.day === new Date().getDate());
    if (!daily) return;
    toggleDaily(daily.id);
  };

useEffect(() => {
  createNewDailies();
}, [templates]);


function templateHasDailyForToday(template: Template) {
  return (monthDailies.some(d => d.text == template.text));
}

const createNewDailies = async () => {
  const todayDay = new Date().getDate();
  templates.forEach(template => {
    if ((!templateHasDailyForToday(template)) && selectedMonth == new Date().getMonth() && selectedYear == new Date().getFullYear()) {
      const newDaily: Daily = {
        id: Date.now() + Math.random(),  
        text: template.text,
        completed: false,
        day: todayDay,
        month: selectedMonth,
        year: selectedYear,
      }
      addDaily(newDaily); 
    }
  });
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
          placeholder="Add new template..."
          className="template-input"
        />
        <button type="submit">Add</button>
      </form>
      <div className="template-list">
        {templates.map((template) => (
          <div key={template.id} className="template-item">
            <span>{template.text}</span>
            <input
              type="checkbox"
              checked={!!monthDailies.find(d => d.text === template.text && d.completed && d.day === new Date().getDate())}
              onChange={() => toggleTodayDailyByText(template.text)}
              className="todo-checkbox"
            />
            <button
              className="delete-button"
              onClick={() => {
                deleteTemplate(template.id);
                const dailyToDelete = monthDailies.find(
                  d => d.text === template.text && d.day === new Date().getDate()
                );
                if (dailyToDelete) {
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
