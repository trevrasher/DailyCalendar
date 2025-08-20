import { useEffect, useState } from "react";
import { useTemplates } from "./usetemplates";

export const TemplateList = () => {
  const { templates, addTemplate, deleteTemplate } = useTemplates('');
  const [newTemplate, setNewTemplate] = useState('');
  const [todayDailies, setTodayDailies] = useState<any[]>([]);
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const fetchTodayDailies = async () => {
    const res = await fetch(`/api/dailies?day=${day}&month=${month}&year=${year}`);
    const data = await res.json();
    setTodayDailies(data);
  };

  useEffect(() => {
    fetchTodayDailies();
  }, []);

  const toggleTodayDailyByText = async (text: string) => {
    const daily = todayDailies.find((d: any) => d.text === text);
    if (!daily) return;
    await fetch('/api/dailies', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: daily.id, completed: !daily.completed }),
    });
    fetchTodayDailies();
  };

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
              checked={!!todayDailies.find(d => d.text === template.text && d.completed)}
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