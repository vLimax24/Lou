import React from "react"
import { useDraggable } from "@dnd-kit/core"
import type { UseDraggableArguments } from "@dnd-kit/core"
import { Id } from "@/convex/_generated/dataModel"
import { Badge } from "@/components/ui/badge"
import { GripVertical } from "lucide-react"

interface WorkItem {
  _id: Id<"teamProjectWorkItems">;
  _creationTime: number;
  status: string;
  name: string;
  description: string;
  priority: string;
  type: string;
  date: string;
  assignedUsers: Id<"users">[];
  projectId: Id<"projects">;
}

interface DraggableProps {
  id?: string;
  task: WorkItem;
}

export const WorkItemsDraggable = ({id, task}: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: id,
  } as UseDraggableArguments)
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        
      }
    : undefined

  const date = new Date(task?.date)

  return (
    <div ref={setNodeRef} style={style} className="flex flex-row justify-between bg-background p-3 rounded-md items-center min-h-20">
      <div className="flex flex-col items-start flex-1">
        <div className="flex items-center justify-between w-full">
            <p className='text-md md:text-xl font-bold'>{task?.name}</p>
            <p className='text-sm text-gray-500'>{date.toLocaleDateString()}</p>
        </div>
        <p className="mt-0">{task?.description}</p>
        <div className="flex items-center justify-between mt-2">
        <Badge 
            variant="default" 
            className={`mr-2 ${
                task?.priority === "High" ? "bg-red-500" :
                task?.priority === "Medium" ? "bg-yellow-500" :
                task?.priority === "Normal" ? "bg-blue-500" :
                "bg-green-500"
            } ${
                task?.priority === "High" ? "hover:bg-red-600" :
                task?.priority === "Medium" ? "hover:bg-yellow-600" :
                task?.priority === "Normal" ? "hover:bg-blue-600" :
                "bg-green-500"
            }`}
        >
            {task?.priority}
        </Badge>            
        <Badge variant="default" className={`${
                task?.type === "Writng" ? "hover:bg-green-600" :
                task?.type === "Speaking" ? "hover:bg-teal-600" :
                task?.type === "Reading" ? "hover:bg-blue-600" :
                "bg-green-500"
            } ${
                task?.type === "Writng" ? "bg-green-500" :
                task?.type === "Speaking" ? "bg-teal-500" :
                task?.type === "Reading" ? "bg-blue-500" :
                "bg-green-500"
            }`}>{task?.type}</Badge>
        </div>
      </div>
      <button ref={setActivatorNodeRef} {...listeners} {...attributes}><GripVertical className='size-4'/></button>
    </div>
  )
}
