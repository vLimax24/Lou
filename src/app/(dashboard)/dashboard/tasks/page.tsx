'use client';

import { api } from '@/convex/_generated/api';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { AddTaskDialog } from './task-form';
import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

type TaskStatus = 'PENDING' | 'IN-PROGRESS' | 'COMPLETED';

interface Task {
  _id: string; // Assuming _id is a string
  text: string;
  status: TaskStatus;
}

const taskTypes: Record<string, TaskStatus> = {
  todo: 'PENDING',
  inProgress: 'IN-PROGRESS',
  completed: 'COMPLETED',
};

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const Tasks = (): JSX.Element => {
  const { isAuthenticated } = useConvexAuth();
  const tasks = useQuery<Task[]>(
    api.tasks.getTasks,
    !isAuthenticated ? 'skip' : undefined
  );
  const updateTask = useMutation<{ taskId: string, newStatus: TaskStatus }>(api.tasks.updateTaskStatus);
  const containers: TaskStatus[] = Object.values(taskTypes);
  const [parent, setParent] = useState<string | null>(null);

  async function handleDragEnd(event: DragEndEvent): Promise<void> {
    const { over, active } = event;
    if (!over) return; // No drop target
    const newStatus: TaskStatus = over.id as TaskStatus;
    const taskId: string = active.id as string;

    // Update task status
    await updateTask.mutateAsync({ taskId, newStatus });
    setParent(null); // Reset parent
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <AddTaskDialog />
      <div className='flex w-full justify-between'>
        {containers.map((type: TaskStatus) => (
          <div key={type} className="w-1/3 p-4">
            <h2 className="text-lg font-bold mb-4">{capitalizeFirstLetter(type.replace('-', ' '))}</h2>
            <Droppable key={type} id={type}>
              {tasks
                ?.filter((task) => task.status === type)
                .map((task) => (
                  <Draggable key={task._id} id={task._id}>
                    <div className="bg-gray-100 p-2 rounded shadow mb-2">{task.text}</div>
                  </Draggable>
                ))}
            </Droppable>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default Tasks;
