import { v } from "convex/values"
import { authMutation, authQuery } from "./util"

export const createLearningResource = authMutation({
  args: {
    template: v.object({
      topic: v.string(),
      subject: v.string(),
      questions: v.array(
        v.object({ question: v.string(), answer: v.string() })
      ),
    }),
  },
  handler: async ({ db, user }, args) => {
    const newLearningResource = await db.insert("learningResources", {
      userId: user._id,
      template: args.template,
    })
    return newLearningResource
  },
})

export const getLearningResources = authQuery({
  args: {},
  handler: async ({ db, user }) => {
    if (user) {
      const learningResources = await db
        .query("learningResources")
        .withIndex("by_userId", q => q.eq("userId", user._id))
        .collect()

      return learningResources
    }
  },
})
