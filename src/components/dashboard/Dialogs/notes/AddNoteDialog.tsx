import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  text: z.string().min(2).max(50),
  showInCalendar: z.boolean(),
  date: z.date(),
});

type FormData = z.infer<typeof formSchema>;

export function AddNoteDialog({ subjectId }: { subjectId?: Id<'subjects'> }) {
  const addNote = useMutation(api.notes.addNote);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      showInCalendar: false,
      date: new Date(),
    },
  });

  async function onSubmit(values: FormData) {
    try {
      const formattedDate = values.date.toISOString();

      await addNote({
        text: values.text,
        showInCalendar: values.showInCalendar,
        date: formattedDate,
        subjectId: subjectId,
      });
      toast('Note added!');
      form.reset();
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
      <DialogContent className="transition-all duration-300 ease-in-out sm:max-w-[425px]">
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
                        <Input placeholder="Clouds are white now" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="showInCalendar"
                  render={({field}) => (
                    <FormItem>
                      <FormControl className="flex">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="showInCalendar">
                            Show in Calendar
                          </Label>
                          <Switch
                            id="showInCalendar"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
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
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Pick a due date</FormLabel>
                        <FormControl className="flex">
                          <div>
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              className="grid w-full place-items-center rounded-md border"
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
