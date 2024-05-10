import { v } from "convex/values"
import { authMutation, authQuery } from "./util"


export const addProject = authMutation({
    args: {
        name: v.string(),
        description: v.string(),
        subject: v.id("subjects"),
        deadline: v.string(),
    },
    handler: async ({ db, user }, args) => {
        const newProject = await db.insert("projects", {
            name: args.name,
            description: args.description,
            subject: args.subject,
            owner: user._id,
            pinned: false,
            deadline: args.deadline,
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
            .collect()

            return projects
        }
    },
})

export const pinProject = authMutation({
    args: {
        projectId: v.id("projects"),
        pinned: v.boolean(),
    },
    handler: async ({ db, user }, args) => {
        const project = await db.get(args.projectId)
        if (user._id === project?.owner) {
            await db.patch(args.projectId, { pinned: args.pinned })
        }
    },
})

export const getSpecificProject = authQuery({
    args: { projectId: v.id("projects") },
    handler: async ({ db }, args) => {
        const project = await db.get(args.projectId)
        return project
    },
})  

export const updateProjectName = authMutation({
    args: {
        projectId: v.id("projects"),
        name: v.string(),
    },
    handler: async ({ db, user }, args) => {
        const project = await db.get(args.projectId)
        if (user._id === project?.owner) {
            await db.patch(args.projectId, { name: args.name })
        }
    },
})

export const updateProjectDescription = authMutation({
    args: {
        projectId: v.id("projects"),
        description: v.string(),
    },
    handler: async ({ db, user }, args) => {
        const project = await db.get(args.projectId)
        if (user._id === project?.owner) {
            await db.patch(args.projectId, { description: args.description })
        }
    },
})

export const updateDeadline = authMutation({
    args: {
        projectId: v.id("projects"),
        deadline: v.string(),
    },
    handler: async ({ db, user }, args) => {
        const project = await db.get(args.projectId)
        if (user._id === project?.owner) {
            await db.patch(args.projectId, { deadline: args.deadline })
        }
    },
})

export const deleteProject = authMutation({
    args: {
        projectId: v.id("projects"),
    },
    handler: async ({ db, user }, args) => {
        const project = await db.get(args.projectId)
        if (user._id === project?.owner) {
            await db.delete(args.projectId)
        }
    },
})
