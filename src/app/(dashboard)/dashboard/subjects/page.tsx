'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import React from 'react';
import SubjectCard from './subject-card';
import { AddSubjectDialog } from './AddSubjectDialog';

function Subjects() {
  const subjects = useQuery(api.studentSubjects.getUserSubjects);

  return (
    <div className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Subjects</h1>
        <AddSubjectDialog />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {!subjects ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : (
            subjects.map(subject => (
              <SubjectCard subject={subject} key={subject._id} />
            ))
        )}
      </div>
    </div>
  );
}

export default Subjects;

