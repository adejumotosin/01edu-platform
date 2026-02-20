import { create } from 'zustand'

const CYCLE = { todo: 'doing', doing: 'done', done: 'todo' }

export const useProgressStore = create((set, get) => ({
  progress: JSON.parse(localStorage.getItem('01edu-progress') || '{}'),
  setStatus: (subjectId, status) => {
    const next = { ...get().progress, [subjectId]: status }
    localStorage.setItem('01edu-progress', JSON.stringify(next))
    set({ progress: next })
  },
  cycleStatus: (subjectId) => {
    const current = get().progress[subjectId] || 'todo'
    const next = { ...get().progress, [subjectId]: CYCLE[current] }
    localStorage.setItem('01edu-progress', JSON.stringify(next))
    set({ progress: next })
  },
}))

export const useAIStore = create((set, get) => ({
  conversations: {},
  loading: false,
  addMessage: (key, message) => {
    const current = get().conversations[key] || []
    set({
      conversations: {
        ...get().conversations,
        [key]: [...current, message],
      }
    })
  },
  setLoading: (loading) => set({ loading }),
  clearConversation: (key) => {
    const convos = { ...get().conversations }
    delete convos[key]
    set({ conversations: convos })
  },
}))
