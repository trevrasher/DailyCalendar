import { useState, useEffect } from 'react';

export interface Daily {
  id: number;
  text: string;
  completed: boolean;
  day: number;
  month: number;
  year: number;
}

export function useDailies(day: number, month: number, year: number) {
  const [dailies, setDailies] = useState<Daily[]>([]);

  const fetchDailies = async () => {
    const response = await fetch(`/api/dailies?month=${month}&year=${year}`);
    const data = await response.json();
    setDailies(data);
  };

  useEffect(() => {
    fetchDailies();
  }, [month, year]);


  const toggleDaily = async (id: number) => {
try {
    const dailyToUpdate = dailies.find(daily => daily.id === id);
    if (!dailyToUpdate) return;

    const response = await fetch('/api/dailies', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        completed: !dailyToUpdate.completed
      }),
    });

     if (response.ok) {
      setDailies(dailies.map(daily =>
        daily.id === id ? { ...daily, completed: !daily.completed } : daily
      ));
    }
  } catch (error) {
    console.error('Failed to toggle daily:', error);
  }
};

  
const addDaily = async (text: string) => {
    const response = await fetch('/api/dailies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, day, month, year, completed: false }),
    });
    const newDaily = await response.json();
    setDailies([...dailies, newDaily]);
  };

 return {
    dailies,
    toggleDaily,
    addDaily,
 }
 

}