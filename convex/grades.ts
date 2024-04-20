import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { authMutation, authQuery } from "./util"

export const getGrades = authQuery({
  args:{},
  handler: async ({ db, user }) => {
    const grades = await db
      .query("grades")
      .filter(q => q.eq(q.field("userId"), user?._id))
      .collect()

    return grades
  },
})

export const getSubjectGrades = authQuery({
  args: { subjectId: v.id("subjects")},
  handler: async ({ auth, db }, args) => {
    const identity = await auth.getUserIdentity()
    if (!identity) return false
    const subjectGrades = await db
      .query("grades")
      .filter(q => q.eq(q.field("subjectId"), args.subjectId))
      .collect()

    return subjectGrades
  },
})

export const addGrade = authMutation({
  args: {
    grade: v.string(),
    topic: v.string(),
    date: v.string(),
    subjectId: v.id("subjects")
  },
  handler: async ({ db, user }, args) => {
    const newGrade = await db.insert("grades", {
        grade: args.grade,
        topic: args.topic,
        date: args.date,
        userId: user._id,
        subjectId: args.subjectId
    })
    return newGrade
  },
})

export const deleteNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
