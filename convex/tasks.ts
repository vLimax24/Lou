import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getTasks = query({
  handler: async ctx => {
    const tasks = await ctx.db.query('tasks').collect();
    return tasks;
  },
});

export const addTask = mutation({
  args: {
    text: v.string(),
    isCompleted: v.boolean()
  },
  handler: async (ctx, args) => {
    const newTask = await ctx.db.insert("tasks", { text: args.text, isCompleted: args.isCompleted });
    return newTask;
  },
})
