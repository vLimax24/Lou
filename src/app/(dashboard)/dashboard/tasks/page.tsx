'use client';

import { api } from '@/convex/_generated/api';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { AddTaskDialog } from './task-form';
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

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
  const containers = Object.values(TaskTypes);
  const [parent, setParent] = useState(null);

  async function handleDragEnd(event) {
    const { over, active } = event;
    if (!over) return; // No drop target
    const newStatus = over.id;
    const taskId = active.id;

    // Update task status
    await updateTask({ taskId, newStatus });
    setParent(null); // Reset parent
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <AddTaskDialog />
      <div className='flex w-full justify-between'>
        {containers.map((type) => (
          <Droppable key={type} id={type}>
            {tasks?.filter((task) => task.status === type).map((task) => (
              <Draggable key={task._id} id={task._id}>
                {task.text}
              </Draggable>
            ))}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
};

export default Tasks;
