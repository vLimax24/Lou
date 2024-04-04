import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { authMutation, authQuery } from './util';

export const getTasks = authQuery({
  args:{},
  handler: async ({ auth, db, user }) => {
  
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error('you must be logged in to get your notes');
    }
    const notes = await db
      .query('notes')
      .filter(q => q.eq(q.field('userId'), user?._id))
      .collect();

    return notes;
  },
});

export const updateNoteText = authMutation({
  args: { noteId: v.id('notes'), newText: v.string()},
  handler: async(ctx, args) => {
    await ctx.db.patch(args.noteId, {text: args.newText})
  }
})

export const addNote = mutation({
  args: {
    showInCalendar: v.boolean(),
    text: v.string(),
    date: v.optional(v.string()),
    userId: v.id("users")
  },
  handler: async ({ auth, db }, args) => {
    // const user = await auth.getUserIdentity();
    if (!args.userId) {
      throw new Error('you must be logged in to create a note');
    }
    const newNote = await db.insert('notes', {
      text: args.text,
      showInCalendar: args.showInCalendar,
      date: args.date,
      userId: args.userId
    });
    return newNote;
  },
});
