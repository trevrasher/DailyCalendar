import { useState, useEffect } from 'react';

interface Daily {
  id: number;
  text: string;
  completed: boolean;
  day: number;
  month: number;
  year: number;
  
}

export function useDailies(day: number, month: number, year: number) {
  const [dailies, setDailies] = useState<Daily[]>([]);

   useEffect(() => {
    fetchDailies();
  }, [day, month, year]);

  const fetchDailies = async () => {
    const response = await fetch(`/api/dailies?day=${day}&month=${month}&year=${year}`);
    const data = await response.json();
    setDailies(data);
  };


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
 return {
    dailies,
    toggleDaily
 }
 

}