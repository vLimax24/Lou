import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  tasks: defineTable({
    status: v.string(),
    text: v.string(),
    userId: v.id("users"),
    subjectId: v.optional(v.id("subjects")),
  })
    .index("by_subjectId", ["subjectId"])
    .index("by_userId", ["userId"]),
  gradingSystems: defineTable({
    countryName: v.string(),
    countryCode: v.string(),
    system: v.string(),
    possibleGrades: v.array(v.string()),
  }),
  notifications: defineTable({
    recieverUserId: v.id("users"),
    senderUserId: v.optional(v.id("users")),
    documentId: v.optional(v.id("documents")),
    projectId: v.optional(v.id("projects")),
    subjectId: v.optional(v.id("subjects")),
    senderImage: v.optional(v.string()),
    text: v.string(),
    date: v.string(),
  }),
  documents: defineTable({
    name: v.string(),
    accessType: v.string(),
    allowedUsers: v.optional(v.array(v.id("users"))),
    users: v.optional(v.array(v.id("users"))),
    owner: v.id("users"),
  }).index("by_accessType", ["accessType"]),
  learningResources: defineTable({
    userId: v.id("users"),
    template: v.object({
      topic: v.string(),
      subject: v.string(),
      questions: v.array(
        v.object({ question: v.string(), answer: v.string() })
      ),
    }),
  }).index("by_userId", ["userId"]),
  notes: defineTable({
    showInCalendar: v.boolean(),
    text: v.string(),
    description: v.string(),
    date: v.string(),
    userId: v.id("users"),
    subjectId: v.optional(v.id("subjects")),
  })
    .index("by_subjectId", ["subjectId"])
    .index("by_userId", ["userId"]),
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    username: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    last_seen: v.optional(v.number()),
    clerkId: v.string(),
    country: v.optional(v.id("gradingSystems")),
    levelExperience: v.optional(v.number()),
  })
    .searchIndex("search_username", {
      searchField: "username",
    })
    .index("by_clerkId", ["clerkId"]),
  subjects: defineTable({
    name: v.string(),
    color: v.optional(v.string()),
    addedByUser: v.optional(v.boolean()),
    template: v.optional(v.string()),
  }),
  events: defineTable({
    title: v.string(),
    description: v.string(),
    // subjects: v.optional(v.string()),
    type: v.string(),
    date: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    allDay: v.optional(v.boolean()),
    userId: v.id("users"),
    subjectId: v.optional(v.id("subjects")),
  }),
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    allowedUsers: v.optional(v.array(v.id("users"))),
    owner: v.id("users"),
    pinned: v.boolean(),
    ressources: v.optional(v.array(v.string())),
    icon: v.optional(v.string()),
    deadline: v.string(),
    subject: v.id("subjects"),
    linkedDocuments: v.array(v.id("documents")),
    linkedNotes: v.optional(v.array(v.id("notes"))),
    linkedTasks: v.optional(v.array(v.id("tasks"))),
    linkedGrades: v.optional(v.array(v.id("grades"))),
  }).index("by_owner", ["owner"]),
  teamProjectWorkItems: defineTable({
    projectId: v.id("projects"),
    name: v.string(),
    description: v.string(),
    priority: v.string(),
    type: v.string(),
    status: v.string(),
    date: v.string(),
    assignedUsers: v.array(v.id("users")),
  }).index("by_projectId", ["projectId"]),
  grades: defineTable({
    userId: v.id("users"),
    subjectId: v.id("subjects"),
    grade: v.string(),
    badges: v.optional(v.array(v.string())),
    topic: v.string(),
    subjectName: v.string(),
    date: v.string(),
  })
    .index("by_subjectId", ["subjectId"])
    .index("by_userId", ["userId"]),
  labels: defineTable({
    name: v.string(),
    color: v.string(),
  }).index("by_name", ["name"]),
  // many to many relationship table
  entityLabels: defineTable({
    entityId: v.union(v.id("events"), v.id("notes"), v.id("documents")),
    labelId: v.id("labels"),
  })
    .index("by_entityId", ["entityId"])
    .index("by_labelId", ["labelId"]),
  studentSubjects: defineTable({
    // many to many relationship table
    userId: v.id("users"),
    subjectId: v.id("subjects"),
    totalAverage: v.optional(v.string()),
  })
    .index("by_subjectId", ["subjectId"])
    .index("by_userId", ["userId"]),
})
