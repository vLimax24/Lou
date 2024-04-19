import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { authMutation, authQuery } from "./util"

export const getEvents = authQuery({
    args:{},
    handler: async (
        { auth, db, user }) => {
    
      const identity = await auth.getUserIdentity()
      if (!identity) {
        throw new Error("you must be logged in to get your notes")
      }
      const events = await db
        .query("events")
        .filter(q => q.eq(q.field("userId"), user?._id))
        .collect()
  
      return events
    },
})

export const getSpecificEvent = authQuery({
  args: { eventId: v.id("events") },
  handler: async ({ auth, db }, args) => {
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error("you must be logged in to get your events")
    }
    const event = await db
      .query("events")
      .filter(q => q.eq(q.field("_id"), args.eventId))
      .first()

    return event
  },
})

export const addEvent = authMutation({
    args: {
        title: v.string(),
        description: v.string(),
        // subject: v.optional(v.string()),
        type: v.string(),
        date: v.string(),
       
    },
    handler: async ({ db, user }, args) => {
      // const user = await auth.getUserIdentity();
      if (!user) {
        throw new Error("you must be logged in to create an event!")
      }
      const newEvent = await db.insert("events", {
        title: args.title,
        description: args.description,
        // subjects: args.subject,
        type: args.type,
        date: args.date,
        userId: user._id
      })
      return newEvent
    },
})

export const deleteEvent = mutation({
    args: { 
        id: v.id("events") 
    },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id)
    },
})

export const editEvent = authMutation({
    args: { 
        eventId: v.id("events"),
        newTitle: v.string(),
        newDate: v.string(),
        newDescription: v.string(),
        newType: v.string(),
        // newSubjects: v.string()
    },
    handler: async(ctx, args) => {
        await ctx.db.patch(args.eventId, { 
            title: args.newTitle,
            description: args.newDescription,
            date: args.newDate,
            // subjects: args.newSubjects,
            type: args.newType
        })
    }
  })