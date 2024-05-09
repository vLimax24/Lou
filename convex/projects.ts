import { v } from "convex/values"
import { authMutation, authQuery } from "./util"


export const addProject = authMutation({
    args: {
        name: v.string(),
        description: v.string(),
        subject: v.id("subjects"),
    },
    handler: async ({ db, user }, args) => {
        const newProject = await db.insert("projects", {
            name: args.name,
            description: args.description,
            subject: args.subject,
            owner: user._id,
            pinned: false,
        })
        return newProject
    },
})

export const getProjects = authQuery({
    args: {},
    handler: async ({ db, user }) => {
        if (user) {
            const projects = await db
            .query("projects")
            .withIndex("by_owner", q => q.eq("owner", user._id))
            .filter(q => q.eq(q.field("pinned"), false))
            .collect()

            return projects
        }
    },
})