import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Calendar } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dropdown } from './Dropdown';

interface CalendarGridProps {
  currentMonth: dayjs.Dayjs;
  events: Record<string, string[]>;
  onClick: (date: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  events,
  onClick,
}) => {
    const [dropdownValue, setDropdownValue] = useState('OTHER');
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const renderCalendarGrid = () => {
        const startOfMonth = currentMonth.startOf('month');
        const endOfMonth = currentMonth.endOf('month');
        const startOfWeek = startOfMonth.startOf('week');
        const endOfWeek = endOfMonth.endOf('week');
      
        const calendarRows: JSX.Element[] = [];
      
        let day = startOfWeek;
        let currentRow: JSX.Element[] = [];
        while (day.isBefore(endOfWeek, 'day')) {
          const isCurrentDay = day.isSame(dayjs(), 'day');
      
          currentRow.push(
            <Sheet key={day.format('YYYY-MM-DD')}>
              <SheetTrigger asChild>
                <button
                  className={`flex items-center justify-center h-32 border border-gray-300 hover:cursor-default text-sm relative ${
                    day.month() === currentMonth.month() ? 'bg-white' : 'bg-gray-200 text-gray-500'
                  } ${isCurrentDay ? 'bg-blue-200' : ''}`}
                  style={{ flexGrow: 1 }}
                  onClick={() => {
                    onClick(day.format('YYYY-MM-DD'));
                  }}
                >
                  <div className="absolute top-0 right-0 m-1">{day.format('D')}</div>
                  {events[day.format('YYYY-MM-DD')] && (
                    <div className="text-xs">
                      {events[day.format('YYYY-MM-DD')]?.map((event, index) => (
                        <div key={index}>{event}</div>
                      ))}
                    </div>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>
                  <h1 className='font-bold text-xl font-open-sans'>Create an Event - {day.format('YYYY-MM-DD')}</h1>
                </SheetTitle>
                <div className='mt-2 flex flex-col'>
                  <div className='mb-5'>
                    <Label htmlFor='title'>Title</Label>
                    <Input id='title' type='text' placeholder='Event Title' required className='mt-1'/>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Calendar size={20}/>
                      <Label htmlFor='date' className='ml-2'>Date</Label>
                    </div>
                    <div>
                      <p>{day.format('YYYY-MM-DD')}</p>
                    </div>
                  </div>
                  <div className='mb-5'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea id='description' className='mt-1'/>
                  </div>
                  <div className='flex items-center justify-between'>
                    <h1>Type:</h1>
                    <div className='flex items-center'>
                        <h1 className='mr-2'>{dropdownValue.charAt(0).toUpperCase() + dropdownValue.slice(1).toLowerCase()}</h1>
                        <Dropdown value={dropdownValue} setValue={setDropdownValue} />
                    </div>
                  </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button className='w-full mt-5'>Create</Button>
                    </SheetClose>
              </SheetFooter>
              </SheetContent>

            </Sheet>
          );

          if (currentRow.length === 7) {
            calendarRows.push(
              <div key={day.format('YYYY-MM-DD')} className="flex flex-wrap">
                {currentRow}
              </div>
            );
            currentRow = [];
          }
          day = day.add(1, 'day');
        }
      
        while (day.day() !== 0) {
          const isCurrentDay = day.isSame(dayjs(), 'day');
      
          currentRow.push(
            <div
              key={day.format('YYYY-MM-DD')}
              className={`flex items-center justify-center h-32 border border-gray-300 text-sm relative bg-gray-200 text-gray-500 ${
                isCurrentDay ? 'bg-blue-200' : ''
              }`}
              style={{ flexGrow: 1 }}
            >
              <div className="absolute top-0 right-0 m-1">{day.format('D')}</div>
            </div>
          );
          day = day.add(1, 'day');
        }
      
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
