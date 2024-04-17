import React from "react"
import { useDraggable } from "@dnd-kit/core"
import type { UseDraggableArguments } from "@dnd-kit/core"
import { Id } from "@/convex/_generated/dataModel"
import { Badge } from "@/components/ui/badge"
import { GripVertical } from "lucide-react"

interface Task {
  _id: Id<"tasks">;
  _creationTime: number;
  subjectId?: Id<"subjects"> | undefined;
  status: string;
  text: string;
  userId: Id<"users">;
  subject?: {
    _id: Id<"subjects">;
    _creationTime: number;
    color?: string | undefined;
    addedByUser?: boolean | undefined;
    name: string;
  } | null;
}

interface DraggableProps {
  id?: string;
  task: Task | undefined;
}

export const Draggable = ({id, task}: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: id,
  } as UseDraggableArguments)
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} className="flex flex-row justify-between bg-background p-3 rounded-md items-center min-h-20">
      <div className="flex flex-col space-y-1 items-start gap-6 flex-1">
        <p className='text-md md:text-xl font-bold'>{task?.text}</p>
        {task?.subject && (
          <div className="flex flex-row gap-4">
            <p>Subject: </p>
            <Badge variant="default">{task.subject.name}</Badge>
          </div>
        )}
      </div>
      <button ref={setActivatorNodeRef} {...listeners} {...attributes}><GripVertical className='size-4'/></button>
    </div>
  )
}
