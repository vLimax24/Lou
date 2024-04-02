'use client';

import { Badge } from '@/components/ui/badge';
import { api } from '@/convex/_generated/api';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  type DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { AddTaskDialog } from './task-form';
import { type Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';

type Task = {
  _id: string;
  text: string;
  status: string;
};

type TaskColumns = {
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
};

const TaskTypes = {
  todo: 'PENDING',
  inProgress: 'IN-PROGRESS',
  completed: 'COMPLETED',
};

const Tasks = () => {
  const { isAuthenticated } = useConvexAuth();
  const tasks = useQuery(
    api.tasks.getTasks,
    !isAuthenticated ? 'skip' : undefined
  );
  const updateTask = useMutation(api.tasks.updateTaskStatus);
  const [taskColumns, setTaskColumns] = useState<TaskColumns>({
    todo: [],
    inProgress: [],
    completed: [],
  });

  useEffect(() => {
    if (tasks) {
      const updatedTaskColumns: TaskColumns = {
        todo: tasks.filter(task => task.status === 'PENDING'),
        inProgress: tasks.filter(task => task.status === 'IN-PROGRESS'),
        completed: tasks.filter(task => task.status === 'COMPLETED'),
      };
      setTaskColumns(updatedTaskColumns);
    }
  }, [tasks]);

  const handleDragEnd = async (result: DropResult) => {
    console.log('🚀 ~ handleDragEnd ~ result:', result);
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceColumnId = source.droppableId as keyof TaskColumns;
    const destinationColumnId = destination.droppableId as keyof TaskColumns;
    const task = taskColumns[sourceColumnId].find(t => t._id === draggableId);

    if (!task) return;

    if (sourceColumnId !== destinationColumnId) {
      // Call Convex mutation to update task status based on destinationColumnId
      let newStatus = '';
      switch (destinationColumnId) {
        case 'todo':
          newStatus = 'PENDING';
          break;
        case 'inProgress':
          newStatus = 'IN-PROGRESS';
          break;
        case 'completed':
          newStatus = 'COMPLETED';
          break;
      }

      await updateTask({ taskId: draggableId as Id<'tasks'>, newStatus });
    }

    // Re-fetch or locally adjust the tasks to reflect the change
    // For simplicity here, we're just going to re-filter tasks assuming they're already updated
    // In a real app, you might want to ensure the state is consistent with the server
    setTaskColumns(prevState => {
      return {
        todo: prevState.todo
          .filter(t => t._id !== draggableId)
          .concat(destinationColumnId === 'todo' ? [task] : []),
        inProgress: prevState.inProgress
          .filter(t => t._id !== draggableId)
          .concat(destinationColumnId === 'inProgress' ? [task] : []),
        completed: prevState.completed
          .filter(t => t._id !== draggableId)
          .concat(destinationColumnId === 'completed' ? [task] : []),
      };
    });
  };

  return (
    <>
      <AddTaskDialog />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-8">
          {Object.keys(taskColumns).map(columnId => {
            const columnKey = columnId as keyof TaskColumns;
            return (
              <div key={columnId} className="text-center">
                <h2>
                  {columnId === 'todo'
                    ? 'To-Do'
                    : columnId === 'inProgress'
                      ? 'In Progress'
                      : 'Completed'}
                </h2>
                {taskColumns[columnKey].length > 0 && (
                  <Droppable droppableId={columnKey} key={columnId}>
                    {(provided, snapshot) => (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={cn(
                          "min-h-12 rounded p-4",
                          snapshot.isDraggingOver ? 'bg-gray-50' : "bg-gray-100"
                        )}
                      >
                        {taskColumns[columnKey].map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {provided => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 rounded bg-white p-2 shadow"
                              >
                                <Badge
                                  variant={
                                    task.status === 'COMPLETED'
                                      ? 'outline'
                                      : task.status === 'IN-PROGRESS'
                                        ? 'default'
                                        : 'destructive'
                                  }
                                >
                                  {task.status}
                                </Badge>
                                <p>{task.text}</p>
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                )}
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default Tasks;
