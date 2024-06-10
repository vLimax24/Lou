import { v } from "convex/values"
import { authMutation, authQuery } from "./util"
import { Id } from "./_generated/dataModel"
import { asyncMap } from "convex-helpers"
import { getManyVia } from "convex-helpers/server/relationships"

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

    const documentsWithLabels = await asyncMap(
      filteredDocuments,
      async document => {
        const labels = await getManyVia(
          db,
          "entityLabels",
          "labelId",
          "by_entityId",
          document._id
        )
        return { ...document, labels }
      }
    )

    return documentsWithLabels
  },
})

export const addDocument = authMutation({
  args: {
    name: v.string(),
    content: v.any(),
    accessType: v.string(),
  },
  handler: async ({ db, user }, args) => {
    let arr = [user._id]
    const newDocument = await db.insert("documents", {
      name: args.name,
      owner: user._id,
      accessType: args.accessType,
      allowedUsers: arr,
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

export const updateAccessType = authMutation({
  args: { documentId: v.id("documents"), newAccessType: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.documentId, { accessType: args.newAccessType })
  },
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

export const deleteDocument = authMutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.documentId)
  },
})

export const leaveDocument = authMutation({
  args: { documentId: v.id("documents"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.documentId)
    let arr: any = doc?.allowedUsers
    arr = arr.filter((id: any) => id !== args.userId)
    await ctx.db.patch(args.documentId, { allowedUsers: arr })
  },
})

export const getAllowedUsersProfileImages = authQuery({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.documentId)
    let arr: any = doc?.allowedUsers
    const allowedUsersProfileImages = await Promise.all(
      arr.map(async (id: Id<"users">) => {
        const user = await ctx.db.get(id)
        return user?.profileImage
      })
    )
    return allowedUsersProfileImages
  },
})

export const getEveryoneDocuments = authQuery({
  args: {},
  handler: async ctx => {
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_accessType", q => q.eq("accessType", "EVERYONE"))
      .collect()

    return documents
  },
})
