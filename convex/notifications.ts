import { v } from "convex/values"
import { authMutation, authQuery } from "./util"

export const createDocumentInvitation = authMutation({
  args: {
    documentId: v.id("documents"),
    text: v.string(),
    date: v.string(),
    recieverUserId: v.id("users"),
    senderUserId: v.optional(v.id("users")),
    senderImage: v.optional(v.string()),
  },
  handler: async ({ db }, args) => {
    const invitation = await db.insert("notifications", {
      text: args.text,
      date: args.date,
      recieverUserId: args.recieverUserId,
      senderUserId: args.senderUserId,
      documentId: args.documentId,
      senderImage: args.senderImage,
    })

    return invitation
  }
})

export const createProjectInvitation = authMutation({
  args: {
    projectId: v.id("projects"),
    text: v.string(),
    date: v.string(),
    recieverUserId: v.id("users"),
    senderUserId: v.optional(v.id("users")),
    senderImage: v.optional(v.string()),
  },
  handler: async ({ db }, args) => {
    const invitation = await db.insert("notifications", {
      text: args.text,
      date: args.date,
      recieverUserId: args.recieverUserId,
      senderUserId: args.senderUserId,
      projectId: args.projectId,
      senderImage: args.senderImage,
    })

    return invitation
  }
})


// get user notifications

export const getUserNotifications = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    const notifications = await db
      .query("notifications")
      .filter((q) => q.eq(q.field("recieverUserId"), user?._id))
      .collect()

    return notifications
  },
})

export const deleteNotification = authMutation({
    args: {
        notificationId: v.id("notifications"),
    },
    handler: async ({ db }, args) => {
        await db.delete(args.notificationId)
    }
})