import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { StateCreator } from "zustand"
import { Doc } from "convex/_generated/dataModel"

// Define types for slices
type UserSlice = {
  user: Doc<"users"> | null
  setUser: (user: Doc<"users">) => void
  updateUser: (user: Doc<"users">) => void
}

type TutorialSlice = {
  step: number
  country: string
  subjects: string[]
  username: string
  selectedSubjects: string[]
  setStep: (step: number) => void
  setCountry: (country: string) => void
  setSubjects: (subjects: string[]) => void
  setUsername: (username: string) => void
  addSubject: (subject: string) => void
  removeSubject: (subject: string) => void
}

// State creators for slices
export const createTutorialSlice: StateCreator<TutorialSlice> = set => ({
  step: 1,
  country: "",
  subjects: [],
  username: "",
  selectedSubjects: [],
  setStep: step => set({ step }),
  setCountry: country => set({ country }),
  setSubjects: subjects => set({ subjects }),
  setUsername: username => set({ username }),
  addSubject: subject =>
    set(state => ({
      selectedSubjects: [...state.selectedSubjects, subject],
    })),
  removeSubject: subject =>
    set(state => ({
      selectedSubjects: state.selectedSubjects.filter(s => s !== subject),
    })),
})

export const createUserSlice: StateCreator<UserSlice> = set => ({
  user: null,
  setUser: user => set({ user }),
  updateUser: user => set({ user }),
})

// Combined store with persistence
export const useStore = create<TutorialSlice & UserSlice>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createTutorialSlice(...args),
    }),
    {
      name: "tutorial-user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
