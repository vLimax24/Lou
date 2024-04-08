'use client'

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CalendarGrid from './CalendarGrid';
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useMutation, useQuery, useConvexAuth } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

import useStoreUser from '@/hooks/auth/useStoreUser';
import moment from 'moment';

interface CalendarProps {
  initialDate?: dayjs.Dayjs;
}

type Events = Record<string, string[]>;

const Calendar: React.FC<CalendarProps> = ({ initialDate = dayjs() }) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const userId = useStoreUser();
  const addEvent = useMutation(api.events.addEvent);

  const { isAuthenticated } = useConvexAuth();
  const events = useQuery(
    api.events.getEvents,
    !isAuthenticated ? 'skip' : undefined
  );
  const noteEvents = useQuery(
    api.notes.getNotes,
    !isAuthenticated ? 'skip' : undefined
  )

  const filteredNoteEvents = noteEvents?.filter((note: any) => note.showInCalendar === true)


  

  const handleDate = (date: string) => {
    // This function could be used to handle clicking on a date cell in the calendar
    // For now, we're just logging the clicked date
    console.log('Clicked on date:', date);
  };


  async function handleCreateEvent(date: any, title: string, type: string, description: string) {
    const formattedDate = moment(date).toISOString()
    console.log(formattedDate)
    try {
      await addEvent({
        title: title,
        description: description,
        date: formattedDate,
        type: type,
        userId: userId!,
      });
      toast('Event added!');
    } catch (error) {
      toast('Error Adding Event!');
    }
  }



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
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className='font-bold text-2xl'>{currentMonth.format('MMMM YYYY')}</h2>
        <div className='flex items-center justify-center mr-2'>
          <button onClick={goToPreviousMonth} className='hover:bg-gray-100 p-1.5 rounded-full'>
            <ChevronLeft size={20}/>
          </button>
          <button onClick={goToCurrentDay} className='pb-1 mx-2'>Today</button>
          <button onClick={goToNextMonth} className='hover:bg-gray-100 p-1.5 rounded-full'>
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>
      <CalendarGrid
        currentMonth={currentMonth}
        events={events}
        onClick={handleDate}
        onCreateEvent={handleCreateEvent}
      />
    </>
  );
};

export default Calendar;
