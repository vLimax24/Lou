import React from 'react';
import type dayjs from 'dayjs';

interface CalendarGridProps {
  currentMonth: dayjs.Dayjs;
  events: Record<string, string[]>;
  onDayDoubleClick: (date: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  events,
  onDayDoubleClick,
}) => {
  const renderCalendarGrid = () => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const startOfWeek = startOfMonth.startOf('week');
    const endOfWeek = endOfMonth.endOf('week');

    const calendarDays: JSX.Element[] = [];

    let day = startOfWeek;
    while (day.isBefore(endOfWeek, 'day')) {
      calendarDays.push(
        <div
          key={day.format('YYYY-MM-DD')}
          className={`flex items-center justify-center h-32 w-44 border border-gray-300 text-sm relative ${
            day.month() === currentMonth.month() ? 'bg-white' : 'bg-gray-200 text-gray-500'
          }`}
          onDoubleClick={() => onDayDoubleClick(day.format('YYYY-MM-DD'))}
        >
          <div className="absolute top-0 right-0 m-1">{day.format('D')}</div>
          {events[day.format('YYYY-MM-DD')] && (
            <div className="text-xs">
              {events[day.format('YYYY-MM-DD')]?.map((event, index) => (
                <div key={index}>{event}</div>
              ))}
            </div>
          )}
        </div>
      );
      day = day.add(1, 'day');
    }

    return calendarDays;
  };

  return <div className="grid grid-cols-7 w-[76rem]">{renderCalendarGrid()}</div>;
};

export default CalendarGrid;
