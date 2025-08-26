import { useEffect, useState } from "react";
import { useTemplates } from "./usetemplates";
import { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";
import { useDailies, Daily } from "./usedailies";


export const TemplateList = () => {
  const { templates, addTemplate, deleteTemplate } = useTemplates('');
  const [newTemplate, setNewTemplate] = useState('');


  const { monthTodos, monthDailies, setMonthDailies, selectedMonth, selectedYear} = useContext(CalendarContext);
  const dailies = monthDailies.filter(daily => daily.day === new Date().getDate());

  const toggleTodayDailyByText = (text: string) => {
    const daily = dailies.find((d: any) => d.text === text);
    if (!daily) return;
    setMonthDailies((prev: Daily[]) => prev.map(d => d.id === daily.id ? { ...d, completed: !d.completed } : d));
  };

  useEffect(() => {
    createNewDailies();
  }, [templates, monthDailies]);
  

const createNewDailies = () => {
  const today = new Date();
  const todayDay = today.getDate();
  // Find templates that do not have a daily for today
  const newDailies = templates
    .filter(template =>
      !monthDailies.some(
        d =>
          d.text === template.text &&
          d.day === todayDay 
      )
    )
    .map(template => ({
      id: Date.now() + Math.random(),
      text: template.text,
      completed: false,
      day: todayDay,
      month: selectedMonth,
      year: selectedYear,
    }));
    console.log("a");
  if (newDailies.length > 0) {
    setMonthDailies(prev => [...prev, ...newDailies]);}
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
              checked={!!dailies.find(d => d.text === template.text && d.completed)}
              onChange={() => toggleTodayDailyByText(template.text)}
              className="todo-checkbox"
            />
            <button className="delete-button" onClick={() => deleteTemplate(template.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};
