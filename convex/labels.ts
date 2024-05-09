import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// add label to table
export const addLabel = mutation({
  args: {
    name: v.string(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("labels", {
      name: args.name,
      color: args.color,
    })
  },
})

// get all labels
export const getLabels = query({
  args: {},
  handler: async (ctx) => {
    const labels = await ctx.db
      .query("labels")
      .collect()

    return labels
  },
})