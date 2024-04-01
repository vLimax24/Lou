import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { authQuery } from './util';

export const getTasks = authQuery({
  args:{},
  handler: async ({ auth, db, user }) => {
  
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error('you must be logged in to get your tasks');
    }
    const tasks = await db
      .query('tasks')
      .filter(q => q.eq(q.field('userId'), user?._id))
      .collect();

    return tasks;
  },
});

export const addTask = mutation({
  args: {
    text: v.string(),
    status: v.string(),
    userId: v.id("users")
  },
  handler: async ({ auth, db }, args) => {
    // const user = await auth.getUserIdentity();
    if (!args.userId) {
      throw new Error('you must be logged in to create a task');
    }
    const newTask = await db.insert('tasks', {
      text: args.text,
      status: args.status,
      userId: args.userId
    });
    return newTask;
  },
});
