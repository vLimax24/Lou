import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getTasks = query({
  handler: async ({ auth, db }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error('you must be logged in to get your tasks');
    }

    const user = await db.query('users').filter((q) => q.eq(q.field("subject"), identity?.subject)).first()

    const tasks = await db.query('tasks').filter((q) => q.eq(q.field("userId"), user?._id)).collect();

    return tasks;
  },
});

export const addTask = mutation({
  args: {
    text: v.string(),
    isCompleted: v.boolean(),
    userId: v.id("users")
  },
  handler: async ({ auth, db }, args) => {
    // const user = await auth.getUserIdentity();
    if (!args.userId) {
      throw new Error('you must be logged in to create a task');
    }
    const newTask = await db.insert('tasks', {
      text: args.text,
      isCompleted: args.isCompleted,
      userId: args.userId
    });
    return newTask;
  },
});
