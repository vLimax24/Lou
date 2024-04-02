import { query } from './_generated/server';
import { authQuery } from './util';
import { getManyFrom } from 'convex-helpers/server/relationships'

export const getAllSubjects = query({
  handler: async ctx => {
    const subjects = await ctx.db.query('subjects').collect();

    return subjects;
  },
});

export const getUserSubjects = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    if (!user) return [];

    const userSubjects = await getManyFrom(db, 'studentSubjects', 'userId', user?._id);

    return userSubjects;
  },
});
