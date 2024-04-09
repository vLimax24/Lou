import { Button, buttonVariants } from '@/components/ui/button';
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from 'convex/react';

const formSchema = z.object({
  topic: z.string().min(2).max(50),
  grade: z.string(),
  date: z.date(),
});

type FormData = z.infer<typeof formSchema>;

export function AddGradeDialog({ subjectId }:any) {
  const [date, setDate] = useState<Date>(new Date())

  const addNote = useMutation(api.grades.addGrade);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      grade: '',
      date: new Date()
    },
  });

  async function onSubmit(values: FormData) {
    const formattedDate = values.date.toISOString()
    try {
      await addNote({
        topic: values.topic,
        date: formattedDate,
        subjectId: subjectId,
        grade: values.grade,
      });
      toast(`Grade ${values.grade} added!`);
      form.reset();
    } catch (error) {
      toast('Error Adding Grade!');
    }
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: 'outline' })}>
        Add Grade
      </DialogTrigger>
      <DialogContent className="transition-all duration-300 ease-in-out sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Grade</DialogTitle>
          <DialogDescription>Add a new grade for yourself.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name='topic'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="Trigonometry " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="rounded-md border flex items-center justify-center"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='grade'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <div className='flex items-center justify-between'>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Grade</SelectLabel>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit">Add Subject</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


