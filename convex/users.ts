import { ConvexError, v } from "convex/values"
import { internalQuery, mutation } from "./_generated/server"
import { authAction, authMutation, authQuery } from "./util"
import { internal } from "./_generated/api"
import { Id } from "./_generated/dataModel"

export const getUserById = internalQuery({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", q => q.eq("subject", args.userId))
      .first()

    return user
  },
})

export const store = mutation({
  args: {},
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Called storeUser without authentication present")
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", q =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique()
    if (user !== null) {
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name })
      }
      return user._id
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      subject: identity.subject,
      email: identity.email!,
      pictureUrl: identity.pictureUrl,
      name: identity.name,
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
