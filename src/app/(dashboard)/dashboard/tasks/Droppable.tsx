import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { UseDroppableArguments } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

export function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  } as UseDroppableArguments);
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className='w-full min-h-20 border border-gray-500 rounded-lg p-2 flex-grow mr-2 last:mr-0'>
      {props.children}
    </div>
  );
}
