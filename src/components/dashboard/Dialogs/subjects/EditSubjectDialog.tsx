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
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'convex/react';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

type FormData = z.infer<typeof formSchema>;

type EditProps = {
    name: string,
    color?: string,
    id: Id<'subjects'>
}

export function EditSubjectDialog({ name, color, id }: EditProps) {
  const editSubject = useAction(api.users.editUserSubjectAction);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  async function onSubmit(values: FormData) {
    try {
      await editSubject({
        name: values.name,
        subjectId: id,
      }).then(() => {
        toast('Subject edited!');
        form.reset();
      });
    } catch (error) {
      toast('Error editing Subject!');
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil
          size={20}
          className={cn(
            "mx-1 duration-300 hover:cursor-pointer hover:text-green-500 text-green-800",
            
          )}
        />
      </DialogTrigger>
      <DialogContent className="transition-all duration-300 ease-in-out sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogDescription>
            Edit the subject for yourself.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Algebra, " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* color picker implemenation remains */}
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit">Edit Subject</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
