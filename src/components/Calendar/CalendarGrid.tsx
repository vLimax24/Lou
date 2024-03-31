import React from 'react';
import dayjs from 'dayjs';

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
      
        const calendarRows: JSX.Element[] = [];
      
        let day = startOfWeek;
        let currentRow: JSX.Element[] = [];
        while (day.isBefore(endOfWeek, 'day')) {
          const isCurrentDay = day.isSame(dayjs(), 'day'); // Check if the current day is today
      
          currentRow.push(
            <div
              key={day.format('YYYY-MM-DD')}
              className={`flex items-center justify-center h-32 border border-gray-300 text-sm relative ${
                day.month() === currentMonth.month() ? 'bg-white' : 'bg-gray-200 text-gray-500'
              } ${isCurrentDay ? 'bg-blue-200' : ''}`} // Apply bg-blue-200 if it's the current day
              style={{ flexGrow: 1 }}
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
          // Check if we've reached the end of the row (7 cells)
          if (currentRow.length === 7) {
            calendarRows.push(
              <div key={day.format('YYYY-MM-DD')} className="flex flex-wrap">
                {currentRow}
              </div>
            );
            currentRow = []; // Reset the current row
          }
          day = day.add(1, 'day');
        }
      
        // Add days from the next month until the end of the week
        while (day.day() !== 0) {
          const isCurrentDay = day.isSame(dayjs(), 'day'); // Check if the current day is today
      
          currentRow.push(
            <div
              key={day.format('YYYY-MM-DD')}
              className={`flex items-center justify-center h-32 border border-gray-300 text-sm relative bg-gray-200 text-gray-500 ${
                isCurrentDay ? 'bg-blue-200' : ''
              }`} // Apply bg-blue-200 if it's the current day
              style={{ flexGrow: 1 }}
            >
              <div className="absolute top-0 right-0 m-1">{day.format('D')}</div>
            </div>
          );
          day = day.add(1, 'day');
        }
      
        // Add the last row
        calendarRows.push(
          <div key={day.format('YYYY-MM-DD')} className="flex flex-wrap">
            {currentRow}
          </div>
        );
      
        return calendarRows;
      };

  return <div>{renderCalendarGrid()}</div>;
};

export default CalendarGrid;
