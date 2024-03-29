import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
    
  }),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
    id: v.id("users"),
    calendarEntry: v.object({
      title: v.string(),
      description: v.string(),
      date: v.string(),
      type: v.string(),
      id: v.id("calendarEntry"),
    }),
    note: v.object({
      title: v.string(),
      description: v.string(),
      subject: v.optional(v.string()),
      dueDate: v.optional(v.string()),
      showInCalender: v.boolean(),
      id: v.id("note"),
    }),
    task: v.object({
      title: v.string(),
      description: v.string(),
      subject: v.optional(v.string()),
      dueDate: v.optional(v.string()),
      showInCalender: v.boolean(),
      id: v.id("task"),
    }),
    provider: v.optional(v.string()),
    grade: v.object({
      subject: v.object({
        grade: v.object({
          date: v.string(),
          topic: v.string(),
          type: v.string(),
          id: v.id("grade"),
        }),
        subjectAverage: v.string()
      }),
      totalAverage: v.string(),
    })
  }),
});