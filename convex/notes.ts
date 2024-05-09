import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { authMutation, authQuery } from "./util"
import { asyncMap } from "convex-helpers"
import { getManyVia } from "convex-helpers/server/relationships"

export const getNotes = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    if (!user) return false

    const notes = await db
      .query("notes")
      .withIndex("by_userId", q => q.eq("userId", user._id))
      .collect()

    const notesWithLabels = await asyncMap(notes, async note => {
      const labels = await getManyVia(
        db,
        "entityLabels",
        "labelId",
        "by_entityId",
        note._id
      )
      return { ...note, labels }
    })

    return notesWithLabels
  },
})

export const getCalendarNotes = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    if (!user) return false

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
  handler: async ({ db }, args) => {
    const note = await db
      .query("notes")
      .filter(q => q.eq(q.field("_id"), args.noteId))
      .first()

    return note
  },
})

export const editNote = authMutation({
  args: {
    noteId: v.id("notes"),
    newText: v.string(),
    newDate: v.string(),
    newShowInCalendar: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.noteId, {
      text: args.newText,
      showInCalendar: args.newShowInCalendar,
      date: args.newDate,
    })
  },
})

export const addNote = authMutation({
  args: {
    showInCalendar: v.boolean(),
    text: v.string(),
    date: v.string(),
    subjectId: v.optional(v.id("subjects")),
  },
  handler: async ({ db, user }, args) => {
    const newNote = await db.insert("notes", {
      text: args.text,
      showInCalendar: args.showInCalendar,
      date: args.date,
      userId: user._id,
      subjectId: args.subjectId,
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
