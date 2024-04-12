import React from "react"
import { useDroppable } from "@dnd-kit/core"
import type { UseDroppableArguments } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

interface DroppableProps {
  id: string;
  children: React.ReactNode;
  status: string;
}

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  } as UseDroppableArguments)

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-lg bg-muted px-4 pb-4 ",
        isOver && "bg-muted/40"
      )}
    >
      <h2 className="pb-2 pt-4 font-semibold">
        {capitalizeFirstLetter(props.status.replace("-", " "))}
      </h2>
      <div className="grid grid-cols-1 gap-3">{props.children}</div>
    </div>
  )
}
