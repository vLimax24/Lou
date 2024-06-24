import { create, StateCreator } from "zustand"
import { Doc } from "convex/_generated/dataModel"

type UserSlice = {
  user: Doc<"users"> | null
  setUser: (user: Doc<"users">) => void
  updateUser: (user: Doc<"users">) => void
}

type TutorialSlice = {
  step: number
  country: string
  subjects: string
  username: string
  setStep: (step: number) => void
  setCountry: (country: string) => void
  setSubjects: (subjects: string) => void
  setUsername: (username: string) => void
}

export const createTutorialSlice: StateCreator<TutorialSlice> = set => ({
  step: 1,
  country: "",
  subjects: "",
  username: "",
  setStep: step => set({ step }),
  setCountry: country => set({ country }),
  setSubjects: subjects => set({ subjects }),
  setUsername: username => set({ username }),
})

export const createUserSlice: StateCreator<UserSlice> = set => ({
  user: null,
  setUser: user => set({ user }),
  updateUser: user => set({ user }),
})

export const useStore = create<TutorialSlice & UserSlice>((...a) => ({
  ...createUserSlice(...a),
  ...createTutorialSlice(...a),
}))
