import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style} className='w-full min-h-20 border border-gray-500 rounded-lg p-2 flex-grow mr-2 last:mr-0'>
      {props.children}
    </div>
  );
}