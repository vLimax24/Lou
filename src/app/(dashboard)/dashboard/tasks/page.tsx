'use client';

import { Badge } from '@/components/ui/badge';
import { api } from '@/convex/_generated/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'convex/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

//  components
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import useStoreUser from '@/hooks/auth/useStoreUser';

const Tasks = () => {
  const tasks = useQuery(api.tasks.getTasks);

  return (
    <>
    <AddTaskDialog/>
    <ul className="grid grid-cols-1 gap-8">
      {tasks?.map(task => (
        <li key={task._id} className="flex max-w-lg flex-row gap-2 border p-4">
          <Badge variant={task.isCompleted ? 'outline' : 'destructive'}>
            {task.isCompleted ? 'True' : 'False'}
          </Badge>
          <p>{task.text}</p>
        </li>
      ))}
    </ul>
    </>
  );
};

export default Tasks;

const formSchema = z.object({
  text: z.string().min(2).max(50),
  isCompleted: z.boolean().default(false),
});
export function AddTaskDialog() {
  const userId = useStoreUser()
  const addTask = useMutation(api.tasks.addTask)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      isCompleted: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addTask({isCompleted: values.isCompleted, text: values.text, userId: userId!})
      toast('Task Added.')
    } catch (error) {
      toast('Error Adding Task')
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
                  name="isCompleted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Task Status
                        </FormLabel>
                      </div>
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
