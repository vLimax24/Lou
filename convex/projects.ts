import { v } from "convex/values"
import { authMutation, authQuery } from "./util"
import { Id } from "./_generated/dataModel"


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
            allowedUsers: [],
            linkedDocuments: [],
            ressources: [],
        })
        return newProject
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

export const addUserToAllowedUsers = authMutation({
    args: { projectId: v.id("projects"), userId: v.id("users") },
    handler: async (ctx, args) => {
      const doc = await ctx.db.get(args.projectId)
      let arr = doc?.allowedUsers
  
      if (!Array.isArray(arr)) {
        arr = [args.userId]
      } else {
        arr.push(args.userId)
      }
  
      await ctx.db.patch(args.projectId, { allowedUsers: arr })
    },
})

export const getProjects = authQuery({
    args: {},
    handler: async ({ db, user }) => {
      const projects = await db
        .query("projects")
  
        .collect()
  
      const filteredProjects = projects.filter(doc => {
        return (
          doc.owner === user?._id ||
          (doc.allowedUsers && user?._id && doc.allowedUsers.includes(user._id))
        )
      })

      return filteredProjects
    }
})

export const getAllowedUsers = authQuery({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
      const doc = await ctx.db.get(args.projectId)
      let arr: any = doc?.allowedUsers
      const allowedUsers = await Promise.all(
        arr.map(async (id: Id<"users">) => {
          const user = await ctx.db.get(id)
          return user
        })
      )
      return allowedUsers
    },
})

export const removePersonFromProject = authMutation({
    args: { projectId: v.id("projects"), userId: v.id("users") },
    handler: async (ctx, args) => {
      const doc = await ctx.db.get(args.projectId)
      let arr: any = doc?.allowedUsers
      arr = arr.filter((id: any) => id !== args.userId)
      await ctx.db.patch(args.projectId, { allowedUsers: arr })
    },
})

export const linkDocument = authMutation({
    args: { projectId: v.id("projects"), documentId: v.id("documents") },
    handler: async (ctx, args) => {
      const doc = await ctx.db.get(args.projectId)
      let arr: any = doc?.linkedDocuments
      arr.push(args.documentId)
      await ctx.db.patch(args.projectId, { linkedDocuments: arr })
    },
})

export const addLinkToRessource = authMutation({
    args: { projectId: v.id("projects"), resource: v.string() },
    handler: async (ctx, args) => {
      const doc = await ctx.db.get(args.projectId)
      let arr: string[] = doc?.ressources || []
      arr.push(args.resource)
      await ctx.db.patch(args.projectId, { ressources: arr })
    },
})

export const removeResourceFromProject = authMutation({
    args: { projectId: v.id("projects"), ressource: v.string() },
    handler: async (ctx, args) => {
        const doc = await ctx.db.get(args.projectId)
        let arr: any = doc?.ressources
        arr = arr.filter((id: any) => id !== args.ressource)
        await ctx.db.patch(args.projectId, { ressources: arr })
    },
})

export const searchRessources = authQuery({
    args: { projectId: v.id("projects"), searchTerm: v.string() },
    handler: async (ctx, args) => {
        const doc = await ctx.db.get(args.projectId)
        let arr: any = doc?.ressources
        const filteredRessources = arr.filter((ressource: string) => {
            return (
                ressource.toLowerCase().includes(args.searchTerm.toLowerCase())
            )
        })
        return filteredRessources
    },
})