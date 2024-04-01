'use client';

import { Badge } from '@/components/ui/badge';
import { api } from '@/convex/_generated/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

//  components
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import useStoreUser from '@/hooks/auth/useStoreUser';
import { Loader2 } from 'lucide-react';

type BadgeVariant =
  | 'outline'
  | 'default'
  | 'destructive'
  | 'secondary'
  | null
  | undefined;

const TaskStatus: Record<string, BadgeVariant> = {
  COMPLETED: 'outline',
  'IN-PROGRESS': 'default',
  PENDING: 'destructive',
};
const Tasks = () => {
  const { isAuthenticated } = useConvexAuth();
  const tasks = useQuery(
    api.tasks.getTasks,
    !isAuthenticated ? 'skip' : undefined
  );

  function getBadgeVariant(status: string): BadgeVariant {
    const normalizedStatus = status.toUpperCase();
    return TaskStatus[normalizedStatus] ?? 'default';
  }

  return (
    <>
      <AddTaskDialog />
      <ul className="grid grid-cols-1 gap-8">
        {!tasks ? (
          <Loader2 className="size-8 animate-spin" />
        ) : (
          tasks.map(task => (
            <li
              key={task._id}
              className="flex max-w-lg flex-row gap-2 border p-4"
            >
              <Badge variant={getBadgeVariant(task.status)}>
                {task.status}
              </Badge>
              <p>{task.text}</p>
            </li>
          ))
        )}
      </ul>
    </>
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
      await addTask({
        status: values.status,
        text: values.text,
        userId: userId!,
      });
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="PENDING">To-Do</SelectItem>
                              <SelectItem value="IN-PROGRESS">
                                In Progress
                              </SelectItem>
                              <SelectItem value="COMPLETED">
                                Completed
                              </SelectItem>
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
