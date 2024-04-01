'use client'

import { Badge } from '@/components/ui/badge';
import { api } from '@/convex/_generated/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import useStoreUser from '@/hooks/auth/useStoreUser';

type Task = {
  _id: string;
  text: string;
  status: 'PENDING' | 'IN-PROGRESS' | 'COMPLETED';
};

type TaskColumns = {
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
};

const Tasks = () => {
  const tasks = useQuery(api.tasks.getTasks);
  const [taskColumns, setTaskColumns] = useState<TaskColumns>({
    todo: [],
    inProgress: [],
    completed: []
  });

  useEffect(() => {
    if (tasks) {
      const updatedTaskColumns: TaskColumns = {
        todo: tasks.filter(task => task.status === 'PENDING'),
        inProgress: tasks.filter(task => task.status === 'IN-PROGRESS'),
        completed: tasks.filter(task => task.status === 'COMPLETED')
      };
      setTaskColumns(updatedTaskColumns);
    }
  }, [tasks]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
  
    if (!destination) return;
  
    const sourceColumnId = source.droppableId as keyof TaskColumns;
    const destinationColumnId = destination.droppableId as keyof TaskColumns;
  
    if (sourceColumnId === destinationColumnId) {
      // Reordering within the same column
      const updatedTasks = Array.from(taskColumns[sourceColumnId]);
      const [removedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, removedTask);
  
      setTaskColumns(prevState => ({
        ...prevState,
        [sourceColumnId]: updatedTasks
      }));
    } else {
      const sourceTasks = Array.from(taskColumns[sourceColumnId]);
      const destinationTasks = Array.from(taskColumns[destinationColumnId]);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedTask);
  
      setTaskColumns(prevState => ({
        ...prevState,
        [sourceColumnId]: sourceTasks,
        [destinationColumnId]: destinationTasks
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-8">
        {Object.keys(taskColumns).map((columnId: keyof TaskColumns) => (
          <div key={columnId}>
            <h2>{columnId === 'todo' ? 'To-Do' : columnId === 'inProgress' ? 'In Progress' : 'Completed'}</h2>
            {taskColumns[columnId].length > 0 && ( // Check if tasks exist for the column
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-100 p-4 rounded"
                  >
                    {taskColumns[columnId].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 mb-2 rounded shadow"
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
        ))}
      </div>
    </DragDropContext>
  );
};

export default Tasks;

const formSchema = z.object({
  text: z.string().min(2).max(50),
  status: z.enum(['PENDING', 'IN-PROGRESS', 'COMPLETED']).default('PENDING'),
});

export function AddTaskDialog() {
  const userId = useStoreUser();
  const addTask = useMutation(api.tasks.addTask);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      status: 'PENDING',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addTask({ status: values.status, text: values.text, userId: userId! });
      toast('Task Added.');
    } catch (error) {
      toast('Error Adding Task');
    }

    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Add a new task for yourself.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="have to finish coding.."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Status</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="PENDING">To-Do</SelectItem>
                              <SelectItem value="IN-PROGRESS">In Progress</SelectItem>
                              <SelectItem value="COMPLETED">Completed</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}