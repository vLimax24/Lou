import { v } from "convex/values"
import { authMutation, authQuery } from "./util"
import { asyncMap } from "convex-helpers"

export const getTasks = authQuery({
  args: {},
  handler: async ({ auth, db, user }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error("you must be logged in to get your tasks")
    }
    const tasks = await db
    .query("tasks")
    .filter(q => q.eq(q.field("userId"), user?._id))
    .collect()

    const tasksWithSubjects = await asyncMap(tasks, async (task) => {
      if(task.subjectId){
        const subject = await db.get(task.subjectId)

        return {
          ...task,
          subject: subject
        }
      }
      return {
        ...task,
        subject: null
      }
    })

    return tasksWithSubjects
  },
})

export const updateTaskStatus = authMutation({
  args: { taskId: v.id("tasks"), newStatus: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, { status: args.newStatus })
  },
})

export const addTask = authMutation({
  args: {
    text: v.string(),
    status: v.string(),
    subjectId: v.optional(v.id("subjects")),
  },
  handler: async ({ auth, db, user }, args) => {
    if (!auth) {
      throw new Error("you must be logged in to create a task")
    }
    const newTask = await db.insert("tasks", {
      text: args.text,
      status: args.status,
      userId: user?._id,
      subjectId: args.subjectId && args.subjectId
    })
    return newTask
  },
})
