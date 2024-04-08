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

const colorMappings = [
  {
    name: "green-500",
    fromColor: "from-green-500",
    toColor: "to-green-600",
  },
  {
    name: "indigo-500",
    fromColor: "from-indigo-500",
    toColor: "to-indigo-600",
  },
  {
    name: "purple-500",
    fromColor: "from-purple-500",
    toColor: "to-purple-600",
  },
  {
    name: "teal-500",
    fromColor: "from-teal-500",
    toColor: "to-teal-600",
  },
  // Add more color mappings as needed
];

export default function SubjectCard({ subject }: { subject: Doc<'subjects'> }) {

  const colorMapping = colorMappings.find((color) => color.name === subject.color);

  if (!colorMapping) {
    console.error(`Color mapping not found for ${subject.color}`);
    return null;
  }

  const { fromColor, toColor } = colorMapping;


  return (
    <Link
    href={`/dashboard/subjects/${subject._id}`}
    className=" text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
    >
    <Card className={`bg-gradient-to-r ${fromColor} ${toColor} hover:scale-105 ease-linear duration-150 transition-all w-76`}>
      <CardHeader className="pb-6 w-76">

          <CardTitle className="text-2xl font-bold text-white">{subject.name}</CardTitle>
        
      </CardHeader>
      {/* <CardFooter className='pb-12 px-0 '>
        <div className="mt-auto flex w-full items-center justify-end border-t border-gray-200py-2 text-gray-700">
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
      </CardFooter> */}
    </Card>
    </Link>
  );
}
