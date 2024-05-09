import { v } from "convex/values"
import { authMutation, authQuery } from "./util"

export const addLabelToEntity = authMutation({
    args: {
      entityId: v.union(v.id("events"), v.id("notes"), v.id("documents")),
      labelId: v.id("labels")
    },
    handler: async ({ db }, args) => {
      const newLabel = await db.insert("entityLabels", {
        entityId: args.entityId,
        labelId: args.labelId
      })
      return newLabel
    },
  })

export const removeLabelFromEntity = authMutation({
    args: {
      entityId: v.union(v.id("events"), v.id("notes"), v.id("documents")),
      labelId: v.id("labels")
    },
    handler: async ({ db }, args) => {
      const label = await db.query("entityLabels").withIndex("by_entityId", (q) => q.eq("entityId", args.entityId)).first()
      if (!label) return
      await db.delete(label._id)
      
    },
  })

// get labels for an entity
export const getLabelsForEntity = authQuery({
  args: {
    entityId: v.union(v.id("events"), v.id("notes"), v.id("documents")),
  },
  handler: async ({ db }, args) => {
    const labels = await db
      .query("entityLabels")
      .withIndex("by_entityId", q => q.eq("entityId", args.entityId))
      .collect()

    return labels
  },
})