import { useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext';

export interface Daily {
  id: number;
  text: string;
  completed: boolean;
  day: number;
  month: number;
  year: number;
}

export function useDailies() {
  const {
    monthDailies,
    setMonthDailies,
  } = useContext(CalendarContext);



  const toggleDaily = async (id: number) => {
    try {
      const dailyToUpdate = monthDailies.find(daily => daily.id === id);
      if (!dailyToUpdate) return;

      const response = await fetch('/api/dailies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          completed: !dailyToUpdate.completed,
        }),
      });

      if (response.ok) {
        setMonthDailies(monthDailies.map(daily =>
          daily.id === id ? { ...daily, completed: !daily.completed } : daily
        ));
      }
    } catch (error) {
      console.error('Failed to toggle daily:', error);
    }
  };

  const addDaily = async (daily: Omit<Daily, 'id'>) => {
    const response = await fetch('/api/dailies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(daily),
    });
    const newDaily = await response.json();
    setMonthDailies([...monthDailies, newDaily]);
  };

  const deleteDaily = async (id: number) => {
    try {
      const response = await fetch(`/api/dailies?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMonthDailies(monthDailies.filter(daily => daily.id !== id));
      } else {
        console.error('Failed to delete daily');
      }
    } catch (error) {
      console.error('Failed to delete daily:', error);
    }
  };

  return {
    toggleDaily,
    addDaily,
    deleteDaily,
  };
}