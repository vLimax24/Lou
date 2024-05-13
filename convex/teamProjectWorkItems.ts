import { v } from "convex/values"
import { authMutation, authQuery } from "./util"

export const addWorkItem = authMutation({
    args: {
        name: v.string(),
        description: v.string(),
        priority: v.string(),
        type: v.string(),
        date: v.string(),
        projectId: v.id("projects"),
        status: v.string(),
        assignedUser: v.id("users"),
    },
    handler: async ({ db }, args) => {

        const arr = []
        if (args.assignedUser) {
            arr.push(args.assignedUser)
        }
        const newWorkItem = await db.insert("teamProjectWorkItems", {
            name: args.name,
            description: args.description,
            priority: args.priority,
            type: args.type,
            status: args.status,
            date: args.date,
            projectId: args.projectId,
            assignedUsers: arr,
        })
        return newWorkItem
    },
})

export const getWorkItems = authQuery({
    args: { projectId: v.id("projects") },
    handler: async ({ db }, args) => {
        const workItems = await db
            .query("teamProjectWorkItems")
            .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
            .collect()

        return workItems
    },
})

export const updateWorkItemStatus = authMutation({
    args: {
        workItemId: v.id("teamProjectWorkItems"),
        newStatus: v.string(),
    },
    handler: async ({ db }, args) => {
        await db.patch(args.workItemId, {
            status: args.newStatus,
        })
    },
})