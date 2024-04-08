import { v } from 'convex/values';
import { internalMutation, query } from './_generated/server';
import { authQuery } from './util';
import {
  getManyFrom,
  getOneFromOrThrow,
} from 'convex-helpers/server/relationships';

export const getAllSubjects = query({
  handler: async ctx => {
    const subjects = await ctx.db.query('subjects').collect();

    return subjects;
  },
});

export const getSubjectData = authQuery({
  args: { subjectId: v.id('subjects') },
  handler: async (ctx, args) => {
    if (!ctx.auth) throw new Error('Not authorized');
    if (!ctx.user) throw new Error('Not authorized');

    const userSubject = await ctx.db
      .query('studentSubjects')
      .withIndex('by_subjectId', q => q.eq('subjectId', args.subjectId))
      .filter(q => q.eq(q.field('userId'), ctx.user._id)).first();

    if(!userSubject) throw new Error('No associated subject found');

    const subject = await ctx.db.get(userSubject.subjectId);

    if (!subject) throw new Error('No Subject Found');

    const subjectTasks = await ctx.db
      .query('tasks')
      .withIndex('by_userId', q => q.eq('userId', ctx.user._id))
      .filter(q => q.eq(q.field('subjectId'), subject._id))
      .collect();

    const subjectNotes = await ctx.db
      .query('notes')
      .withIndex('by_userId', q => q.eq('userId', ctx.user._id))
      .filter(q => q.eq(q.field('subjectId'), subject._id))
      .collect();

    return { subject, subjectTasks, subjectNotes };
  },
});

export const getUserSubjects = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    if (!user) return [];

    const userSubjects = await getManyFrom(
      db,
      'studentSubjects',
      'by_userId',
      user._id
    );

    return userSubjects;
  },
});

export const addSubject = internalMutation({
  args: { name: v.string(), addedByUser: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    const subjectId = await ctx.db.insert('subjects', {
      name: args.name,
      addedByUser: args.addedByUser || false,
    });

    return subjectId;
  },
});
export const editSubject = internalMutation({
  args: { name: v.string(), subjectId: v.id('subjects') },
  handler: async (ctx, args) => {
    const subject = await ctx.db
      .query('subjects')
      .filter(q => q.eq(q.field('_id'), args.subjectId))
      .first();

    if (!subject) throw new Error('No Subject found.');

    await ctx.db.patch(args.subjectId, {
      name: args.name,
    });

    return await ctx.db.get(args.subjectId);
  },
});
