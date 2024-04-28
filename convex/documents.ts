import { v } from "convex/values"
import { authMutation, authQuery } from "./util"

export const getDocuments = authQuery({
    args:{},
    handler: async ({ db, user }) => {
      const documents = await db
        .query("documents")
        .filter(q => q.eq(q.field("owner"), user?._id))
        .collect()
  
      return documents
    },
})

export const addDocument = authMutation({
    args: {
        name: v.string(),
    },
    handler: async ({ db, user }, args) => {
      const newDocument = await db.insert("documents", {
        name: args.name,
        owner: user._id
      })
      return newDocument
    },
})

export const getSpecificDocument = authQuery({
  args: { documentId: v.id("documents") },
  handler: async ({ db }, args) => {
    const document = await db
      .query("documents")
      .filter(q => q.eq(q.field("_id"), args.documentId))
      .first()

    return document
  },
})

export const updateContent = authMutation({
  args: { documentId: v.id("documents"), newContent: v.optional(v.any()) },
  handler: async(ctx, args) => {
    await ctx.db.patch(args.documentId, { content: args.newContent })
  }
})


