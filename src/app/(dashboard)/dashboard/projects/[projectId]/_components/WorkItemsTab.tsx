import { WorkItemsDraggable } from "@/components/dnd/WorkItemsDraggable"
import { Droppable } from "@/components/dnd/Droppable"
import { useState } from "react"
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  Over,
} from "@dnd-kit/core"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Loader2 } from "lucide-react"
import AddWorkItemDialog from "./AddWorkItemDialog"

const WorkItemsTab = ({ project }: { project: any }) => {

  const updateWorkItemStatus = useMutation(api.teamProjectWorkItems.updateWorkItemStatus)

  const tasks = useQuery(api.teamProjectWorkItems.getWorkItems, { projectId: project._id })

  type TaskStatus = "PENDING" | "IN-PROGRESS" | "COMPLETED";
  const taskTypes: Record<string, TaskStatus> = {
    todo: "PENDING",
    inProgress: "IN-PROGRESS",
    completed: "COMPLETED",
  }

  const containers: TaskStatus[] = Object.values(taskTypes)

  const [parent, setParent] = useState<Over["id"] | null>(null)

  const handleDragEnd = async (event: DragEndEvent): Promise<void> => {
    const { over, active } = event
    if (!over) return // No drop target
    const newStatus: TaskStatus = over.id as TaskStatus
    const taskId: Id<"teamProjectWorkItems"> = active.id as Id<"teamProjectWorkItems">
    setParent(over ? over.id : null)
    // Update task status
    await updateWorkItemStatus({ workItemId: taskId, newStatus: newStatus })
    setParent(null) // Reset parent
  }

  const handleDragStart = async (event: DragStartEvent): Promise<void> => {
    
    const { active } = event
    if (!active) return // No drop target
    setParent(active ? active.id : null)
  }
  const handleDragOver = async (event: DragOverEvent): Promise<void> => {
    console.log("🚀 ~ handleDragOver ~ event:", event)
    console.log(parent)
  }



  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <div className="mb-6 flex w-full items-center justify-between p-4">
        <h1 className="text-4xl font-bold">Your Work Items</h1>
        <AddWorkItemDialog projectId={project._id} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {containers.map((type: TaskStatus) => (
          <Droppable key={type} id={type} status={type}>
            {!tasks ? (
              <Loader2 className="animate-spin" />
            ) : (
              tasks
                .filter(task => task?.status === type)
                .map(task => (
                  <WorkItemsDraggable key={task?._id} id={task?._id} task={task} />
                ))
            )}
          </Droppable>
        ))}
      </div>
      <DragOverlay
        dropAnimation={{
          duration: 500,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
 
      </DragOverlay>
    </DndContext>
  )
}

export default WorkItemsTab
