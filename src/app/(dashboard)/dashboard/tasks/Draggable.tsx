import React from 'react';
import { useDraggable, UseDraggableArguments } from '@dnd-kit/core';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  } as UseDraggableArguments);
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className='w-full'>
      {props.children}
    </button>
  );
}
