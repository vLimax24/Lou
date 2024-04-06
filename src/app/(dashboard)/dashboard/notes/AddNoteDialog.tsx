import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
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
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import useStoreUser from '@/hooks/auth/useStoreUser';

const formSchema = z.object({
  text: z.string().min(2).max(50),
  showInCalendar: z.boolean(),
  date: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function AddNoteDialog() {
  const userId = useStoreUser();
  const addNote = useMutation(api.notes.addNote);
  const [showInCalendar, setShowInCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      showInCalendar: false,
      date: '',
    },
  });

  async function onSubmit(values: FormData) {
    try {
      const formattedDate = date?.toISOString()

      await addNote({
        text: values.text,
        showInCalendar: showInCalendar,
        date: formattedDate,
        userId: userId!,
      });
      toast('Note added!');
      setShowInCalendar(false)
      setDate(undefined)
      form.reset()
    } catch (error) {
      toast('Error Adding Note!');
    }

    console.log(values);
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] transition-all duration-300 ease-in-out">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>Add a new note for yourself.</DialogDescription>
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
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Clouds are white now"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="showInCalendar"
                  render={() => (
                    <FormItem>
                      <FormControl className='flex'> 
                        <div className='flex items-center justify-between'>
                            <Label htmlFor="showInCalendar">Show in Calendar</Label>
                            <Switch id="showInCalendar"                       checked={showInCalendar}
                            onCheckedChange={() => setShowInCalendar(!showInCalendar)} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                    <FormField
                      control={form.control}
                      name="date"
                      render={() => (
                        <FormItem>
                          <FormLabel>Pick a due date</FormLabel>
                          <FormControl className='flex'> 
                            <div>
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border w-full grid place-items-center"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit">Add Note</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
