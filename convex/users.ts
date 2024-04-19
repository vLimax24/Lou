import { ConvexError, v } from "convex/values"
import { internal } from "./_generated/api"
import { Id } from "./_generated/dataModel"
import { internalMutation, internalQuery } from "./_generated/server"
import { authAction, authMutation, authQuery } from "./util"

export const getUserById = internalQuery({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", q => q.eq("clerkId", args.userId))
      .first()

    return user
  },
})

export const createUser = internalMutation({
  args: {
    email: v.any(),
    clerkId: v.string(),
    name: v.string(),
    profileImage: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first()

    if (user) return

    await ctx.db.insert("users", {
      email: args.email,
      clerkId: args.clerkId,
      profileImage: args.profileImage,
      name: args.name,
    })
  },
})

export const updateUser = internalMutation({
  args: { clerkId: v.string(), name: v.string(), profileImage: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first()

    if (!user) {
      throw new ConvexError("user not found")
    }

    await ctx.db.patch(user._id, {
      name: args.name,
      profileImage: args.profileImage,
    })
  },
})


export const updateGradeSystem = authMutation({
  args: { gradeSystem: v.id("gradingSystems") },
  handler: async ({ db, user }, { gradeSystem }) => {
    await db.patch(user._id, { country: gradeSystem })
  },
})

export const getMyUser = authQuery({
  args: {},
  handler: async(ctx) => ctx.user,
})

export const addUserSubjectAction = authAction({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    if (!ctx.auth) throw new ConvexError("Not Authorized")
    if (!ctx.user) throw new Error("Not User")

    const userSubjectId = await ctx.runMutation(internal.subjects.addSubject, {
      name: args.name,
      addedByUser: true
    })

    const assignedSubjectToUser: Id<"studentSubjects"> = await ctx.runMutation(
      internal.studentSubjects.assignUserAddedSubject,
      {
        userId: ctx.user._id,
        subjectId: userSubjectId,
      }
    )

    return assignedSubjectToUser
  },
})
export const editUserSubjectAction = authAction({
  args: { name: v.string(), subjectId: v.id("subjects") },
  handler: async (ctx, args) => {
    if (!ctx.auth) throw new ConvexError("Not Authorized")
    if (!ctx.user) throw new Error("Not User")

    await ctx.runMutation(internal.subjects.editSubject, {
      name: args.name,
      subjectId: args.subjectId
    })

    // if(!userSubject) throw new Error('Issue Editing Subject')

   
  },
})
