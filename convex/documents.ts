import { v } from "convex/values"
import { authMutation, authQuery } from "./util"

export const getDocuments = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    const documents = await db
      .query("documents")
      .collect()

    const filteredDocuments = documents.filter(doc => {
      return (
        doc.owner === user?._id ||
        (doc.allowedUsers && user?._id && doc.allowedUsers.includes(user._id))
      )
    })

    console.log(documents)
    console.log(filteredDocuments)

    return filteredDocuments
  },
})


export const addDocument = authMutation({
    args: {
        name: v.string(),
        content: v.any()
    },
    handler: async ({ db, user }, args) => {
      let arr = [user._id]
      const newDocument = await db.insert("documents", {
        name: args.name,
        content: args.content,
        owner: user._id,
        accessType: "RESTRICTED",
        allowedUsers: arr
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

export const updateAccessType = authMutation({
  args: { documentId: v.id("documents"), newAccessType: v.string() },
  handler: async(ctx, args) => {
    await ctx.db.patch(args.documentId, { accessType: args.newAccessType })
  }
})

// add user to allowedUsers array of document
// documentation:
// async function addElementToArray(ctx, id, field, value) {
//   const doc = await ctx.db.get(id);
//   const arr = doc[field];
//   if (!Array.isArray(arr)) throw new Error("not an array!");
//   arr.push(value);
//   await ctx.db.patch(id, {[field]: arr});
// }

export const addUserToAllowedUsers = authMutation({
  args: { documentId: v.id("documents"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.documentId)
    let arr = doc?.allowedUsers

    // If allowedUsers array doesn't exist, create it with the userId
    if (!Array.isArray(arr)) {
      arr = [args.userId]
    } else {
      // If allowedUsers array exists, push the userId to it
      arr.push(args.userId)
    }

    await ctx.db.patch(args.documentId, { allowedUsers: arr })
  },
})



