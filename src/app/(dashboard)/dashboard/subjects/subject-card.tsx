import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Doc } from '@/convex/_generated/dataModel';
import { Trash } from 'lucide-react';
import { EditSubjectDialog } from './EditSubjectDialog';
import Link from 'next/link';

export default function SubjectCard({ subject }: { subject: Doc<'subjects'> }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Link
          href={`/dashboard/subjects/${subject._id}`}
          className=" text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <CardTitle className="text-2xl underline">{subject.name}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <div className="mt-auto flex w-full items-center justify-end border-t border-gray-200 px-4 py-2 text-gray-700">
          {subject.addedByUser && (
            <>
              <Trash
                size={20}
                className="mx-1 duration-300 hover:cursor-pointer hover:text-green-500"
                // onClick={() => handleDeleteNote(subject._id)}
              />
              <EditSubjectDialog
                name={subject.name}
                color={subject.color}
                id={subject._id}
              />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
