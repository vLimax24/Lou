import { ConvexError, v } from "convex/values"
import { authMutation, authQuery } from "./util"
import { getManyViaOrThrow } from "convex-helpers/server/relationships"
import { internalMutation } from "./_generated/server"

export const assignStudentSubjects = authMutation({
  args: { subjectIds: v.array(v.id("subjects")) },
  handler: async ({ db, user }, { subjectIds }) => {
    const assignedSubjects = await Promise.all(
      subjectIds.map(async subjectId => {
        return await db.insert("studentSubjects", {
          userId: user._id,
          subjectId: subjectId,
        })
      })
    )

    return assignedSubjects
  },
})

export const getStudentSubjects = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    const studentSubjects = await db
      .query("studentSubjects")
      .filter(q => q.eq(q.field("userId"), user?._id))
      .collect()
    return studentSubjects
  },
})

export const getUserSubjects = authQuery({
  args: {},
  handler: async ({ db, user, auth }) => {
    if (!auth) throw new ConvexError("Not Authroized")
    if (!user) throw new ConvexError("User not found")

    const userSubjects = await getManyViaOrThrow(
      db,
      "studentSubjects",
      "subjectId",
      "by_userId",
      user._id
    )

    // if (!userSubjects) return [];

    return userSubjects
  },
})

export const assignUserAddedSubject = internalMutation({
  args: { subjectId: v.id("subjects"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const studentSubjectId = await ctx.db.insert("studentSubjects", {
      userId: args.userId,
      subjectId: args.subjectId,
    })

    return studentSubjectId
  },
})

export const addTotalAverage = authMutation({
  args: {
    totalAverage: v.optional(v.string()),
    studentSubjectId: v.optional(v.id("studentSubjects")),
  },
  handler: async (ctx, args) => {
    if (!args.studentSubjectId) {
      throw new Error("studentSubjectId is required")
    }
    await ctx.db.patch(args.studentSubjectId, {
      totalAverage: args.totalAverage,
    })
  },
})
