import { useCallback, useRef } from 'react'
import { sendAIMessage } from '../lib/api'
import { useAIStore } from '../lib/store'

const EMPTY = []

export function useAI(subjectId) {
  const key = subjectId || 'global'
  const messages = useAIStore(state => state.conversations[key] || EMPTY)
  const loading = useAIStore(state => state.loading)
  const addMessage = useAIStore(state => state.addMessage)
  const setLoading = useAIStore(state => state.setLoading)
  const clearConversation = useAIStore(state => state.clearConversation)

  const messagesRef = useRef(messages)
  messagesRef.current = messages
  const loadingRef = useRef(loading)
  loadingRef.current = loading

  const send = useCallback(async (text, { mode = "", code = "" } = {}) => {
    if (!text.trim() || loadingRef.current) return
    const userMsg = { role: "user", content: text }
    addMessage(key, userMsg)
    setLoading(true)
    try {
      const response = await sendAIMessage({
        messages: [...messagesRef.current, userMsg],
        subjectId,
        mode,
        code,
      })
      addMessage(key, { role: "assistant", content: response.content })
    } catch (err) {
      addMessage(key, {
        role: "assistant",
        content: "Failed to reach the AI. Make sure the backend is running and ANTHROPIC_API_KEY is set.",
      })
    } finally {
      setLoading(false)
    }
  }, [key, subjectId, addMessage, setLoading])

  const clear = useCallback(() => clearConversation(key), [key, clearConversation])

  return { messages, loading, send, clear }
}
