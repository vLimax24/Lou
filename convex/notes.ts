import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { authMutation, authQuery } from "./util"

export const getNotes = authQuery({
  args:{},
  handler: async ({ auth, db, user }) => {
  
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error("you must be logged in to get your notes")
    }
    const notes = await db
      .query("notes")
      .filter(q => q.eq(q.field("userId"), user?._id))
      .collect()

    return notes
  },
})

export const getCalendarNotes = authQuery({
  args:{},
  handler: async ({ auth, db, user }) => {
  
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error("you must be logged in to get your notes")
    }

    if(!user) return false

    const notes = await db
      .query("notes")
      .withIndex("by_userId", q => q.eq("userId", user._id))
      .filter(q => q.eq(q.field("showInCalendar"), true))
      .collect()

    return notes
  },
})

export const getSpecificNote = authQuery({
  args: { noteId: v.id("notes") },
  handler: async ({ auth, db }, args) => {
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error("you must be logged in to get your notes")
    }
    const note = await db
      .query("notes")
      .filter(q => q.eq(q.field("_id"), args.noteId))
      .first()

    return note
  },
})

export const editNote = authMutation({
  args: { noteId: v.id("notes"), newText: v.string(), newDate: v.string(), newShowInCalendar: v.boolean()},
  handler: async(ctx, args) => {
    await ctx.db.patch(args.noteId, {text: args.newText, showInCalendar: args.newShowInCalendar, date: args.newDate})
  }
})

export const addNote = authMutation({
  args: {
    showInCalendar: v.boolean(),
    text: v.string(),
    date: v.string(),
    subjectId: v.optional(v.id("subjects"))
  },
  handler: async ({ auth, db, user }, args) => {
    // const user = await auth.getUserIdentity();
    if (!auth) {
      throw new Error("you must be logged in to create a note")
    }
    const newNote = await db.insert("notes", {
      text: args.text,
      showInCalendar: args.showInCalendar,
      date: args.date,
      userId: user._id,
      subjectId: args.subjectId
    })
    return newNote
  },
})

export const deleteNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})