'use client'

import { Button } from '@/components/ui/button';
import { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import useStoreUser from '@/hooks/auth/useStoreUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/convex/_generated/api';
import { Label } from "@/components/ui/label"
const formSchema = z.object({
  text: z.string().min(2).max(50),
  showInCalendar: z.boolean(),
  date: z.string(),
});

export function AddNoteDialog() {
  const userId = useStoreUser();
  const addNote = useMutation(api.tasks.addNote);
  const [showInCalendar, setShowInCalendar] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      showInCalendar: false,
      date: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addNote({
        text: values.text,
        showInCalendar: values.showInCalendar,
        date: values.date,
        userId: userId!,
      });
      toast('Note added!');
    } catch (error) {
      toast('Error Adding Note!');
    }

    console.log(values);
  }

  const handleSwitchClick = () => {
    setShowInCalendar(!showInCalendar);
  };

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
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className='flex'> 
                        <div className='flex items-center justify-between'>
                            <Label htmlFor="showInCalendar">Show in Calendar</Label>
                            <Switch id="showInCalendar" onClick={handleSwitchClick} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className={`transition-opacity duration-300 ease-in-out opacity-${showInCalendar ? '100' : '0'}`}>
                  {showInCalendar && (
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pick a due date</FormLabel>
                          <FormControl className='flex'> 
                            <div>
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Note</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
