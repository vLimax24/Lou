import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { updateGradeSystem } from './users';

export default defineSchema({
  tasks: defineTable({
    status: v.string(),
    text: v.string(),
    userId: v.id('users'),
    subjectId: v.optional(v.id('subjects'))
  }).index('by_subjectId', ['subjectId']).index('by_userId', ['userId']),
  notes: defineTable({
    showInCalendar: v.boolean(),
    text: v.string(),
    date: v.string(),
    userId: v.id('users'),
    subjectId: v.optional(v.id('subjects'))
  }).index('by_subjectId', ['subjectId']).index('by_userId', ['userId']),
  users: defineTable({
    name: v.optional(v.string()),
    subject: v.string(),
    email: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
    tokenIdentifier: v.string(),
    gradingSystem: v.optional(v.string())
  }).index('by_token', ['tokenIdentifier']).index("by_userId", ['subject']),
  subjects: defineTable({
    name: v.string(),
    color: v.optional(v.string()),
    addedByUser: v.optional(v.boolean())
  }),
  events: defineTable({
    title: v.string(),
    description: v.string(),
    // subjects: v.optional(v.string()),
    type: v.string(),
    date: v.string(),
    userId: v.id('users'),
    subjectId: v.optional(v.id('subjects'))
  }),
  grades: defineTable({
    userId: v.id('users'),
    subjectId: v.id('subjects'),
    grade: v.string(),
    topic: v.string(),
    date: v.string()
  }),
  studentSubjects: defineTable({
    // many to many relationship table
    userId: v.id('users'),
    subjectId: v.id('subjects'),
    totalAverage: v.optional(v.string()),
  })
    .index('by_subjectId', ['subjectId'])
    .index('by_userId', ['userId']),

  // users: defineTable({
  //   name: v.string(),
  //   email: v.string(),
  //   image: v.string(),
  //   id: v.id("users"),
  //   calendarEntry: v.object({
  //     title: v.string(),
  //     description: v.string(),
  //     date: v.string(),
  //     type: v.string(),
  //     id: v.id("calendarEntry"),
  //   }),
  //   note: v.object({
  //     title: v.string(),
  //     description: v.string(),
  //     subject: v.optional(v.string()),
  //     dueDate: v.optional(v.string()),
  //     showInCalender: v.boolean(),
  //     id: v.id("note"),
  //   }),
  //   task: v.object({
  //     title: v.string(),
  //     description: v.string(),
  //     subject: v.optional(v.string()),
  //     dueDate: v.optional(v.string()),
  //     showInCalender: v.boolean(),
  //     id: v.id("task"),
  //   }),
  //   provider: v.optional(v.string()),
  //   grade: v.object({
  //     subject: v.object({
  //       grade: v.object({
  //         date: v.string(),
  //         topic: v.string(),
  //         type: v.string(),
  //         id: v.id("grade"),
  //       }),
  //       subjectAverage: v.string()
  //     }),
  //     totalAverage: v.string(),
  //   })
  // }),
});
