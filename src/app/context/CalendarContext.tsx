import React, { createContext, useState, useEffect } from "react";
import type { Daily } from "../components/usedailies";
import type { Todo } from "../components/usetodos";

interface CalendarContextType {
  monthDailies: Daily[];
  setMonthDailies: React.Dispatch<React.SetStateAction<Daily[]>>;
  monthTodos: Todo[];
  setMonthTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedDay: number | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<number | null>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

export const CalendarContext = createContext<CalendarContextType>({
  monthDailies: [],
  setMonthDailies: () => {},
  monthTodos: [],
  setMonthTodos: () => {},
  selectedDay: null,
  setSelectedDay: () => {},
  selectedMonth: new Date().getMonth(),
  setSelectedMonth: () => {},
  selectedYear: new Date().getFullYear(),
  setSelectedYear: () => {},
});

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const [monthDailies, setMonthDailies] = useState<Daily[]>([]);
  const [monthTodos, setMonthTodos] = useState<Todo[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Fetch dailies for the month
  useEffect(() => {
    fetch(`../api/dailies?month=${selectedMonth}&year=${selectedYear}`)
      .then(res => res.json())
      .then(setMonthDailies);
  }, [selectedMonth, selectedYear]);

  // Fetch todos for the month
  useEffect(() => {
    fetch(`../api/todos?month=${selectedMonth}&year=${selectedYear}`)
      .then(res => res.json())
      .then(setMonthTodos);
  }, [selectedMonth, selectedYear]);

  return (
    <CalendarContext.Provider
      value={{
        monthDailies,
        setMonthDailies,
        monthTodos,
        setMonthTodos,
        selectedDay,
        setSelectedDay,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};