import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { authMutation, authQuery } from './util';

export const getNotes = authQuery({
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

export const getSpecificNote = authQuery({
  args: { noteId: v.id('notes') },
  handler: async ({ auth, db }, args) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error('you must be logged in to get your notes');
    }
    const note = await db
      .query('notes')
      .filter(q => q.eq(q.field('_id'), args.noteId))
      .first();

    return note;
  },
});

export const editNote = authMutation({
  args: { noteId: v.id('notes'), newText: v.string(), newDate: v.string(), newShowInCalendar: v.boolean()},
  handler: async(ctx, args) => {
    await ctx.db.patch(args.noteId, {text: args.newText, showInCalendar: args.newShowInCalendar, date: args.newDate})
  }
})

export const addNote = mutation({
  args: {
    showInCalendar: v.boolean(),
    text: v.string(),
    date: v.string(),
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

export const deleteNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});