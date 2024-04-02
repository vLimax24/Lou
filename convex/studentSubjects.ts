import { v } from 'convex/values';
import { authMutation } from './util';

export const assignStudentSubjects = authMutation({
  args: { subjectIds: v.array(v.id('subjects')) },
  handler: async ({auth, db, user}, {subjectIds}) => {


    const assignedSubjects = await Promise.all(
        subjectIds.map(async (subjectId) => {
          return await db.insert('studentSubjects', {
            userId: user._id,
            subjectId: subjectId
          });
        })
      );
  
      return assignedSubjects
  },
});
