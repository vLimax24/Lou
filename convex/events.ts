import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { authMutation, authQuery } from "./util"

export const getEvents = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    const events = await db
      .query("events")
      .filter(q => q.eq(q.field("userId"), user?._id))
      .collect()

    return events
  },
})

export const getUpcomingEvents = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    const date = new Date().toISOString()
    const events = await db
      .query("events")
      .filter(q => q.eq(q.field("userId"), user?._id))
      .filter(q => q.gt(q.field("date"), date))
      .collect()

    return events
  },
})

export const getSpecificEvent = authQuery({
  args: { eventId: v.id("events") },
  handler: async ({ db }, args) => {
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
    startTime: v.string(),
    endTime: v.string(),
  },
  handler: async ({ db, user }, args) => {
    const newEvent = await db.insert("events", {
      title: args.title,
      description: args.description,
      // subjects: args.subject,
      type: args.type,
      date: args.date,
      userId: user._id,
      startTime: args.startTime,
      endTime: args.endTime,
    })
    return newEvent
  },
})

export const deleteEvent = mutation({
  args: {
    id: v.id("events"),
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
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.eventId, {
      title: args.newTitle,
      description: args.newDescription,
      date: args.newDate,
      type: args.newType,
    })
  },
})

export const updateEventDate = authMutation({
  args: {
    eventId: v.id("events"),
    newDate: v.string(),
    newStartTime: v.string(),
    newEndTime: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.eventId, {
      date: args.newDate,
      startTime: args.newStartTime,
      endTime: args.newEndTime,
    })
  },
})

export const updateEventTime = authMutation({
  args: {
    eventId: v.id("events"),
    newStartTime: v.string(),
    newEndTime: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.eventId, {
      startTime: args.newStartTime,
      endTime: args.newEndTime,
    })
  },
})
