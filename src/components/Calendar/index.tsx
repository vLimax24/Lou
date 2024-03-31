'use client'

import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalendarGrid from './CalendarGrid';
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface CalendarProps {
  initialDate?: dayjs.Dayjs;
}

type Events = Record<string, string[]>;

const Calendar: React.FC<CalendarProps> = ({ initialDate = dayjs() }) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [events, setEvents] = useState<Events>({});

  const handleDate = (date: string) => {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [date]: [...(prevEvents[date] ?? [])],
      }));
  };

  const goToCurrentDay = () => {
    setCurrentMonth(dayjs());
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.add(1, 'month'));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <button onClick={goToPreviousMonth}>
            <ChevronLeft size={20}/>
          </button>
          <button onClick={goToNextMonth}>
            <ChevronRight size={20}/>
          </button>
        </div>
        <h2>{currentMonth.format('MMMM YYYY')}</h2>
        <div>
          <button onClick={goToCurrentDay}>today</button>
        </div>
      </div>
      <CalendarGrid
        currentMonth={currentMonth}
        events={events}
        onClick={handleDate}
      />
    </div>
  );
};

export default Calendar;
