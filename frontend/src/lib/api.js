import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// ── Subjects ─────────────────────────────────────────────────────────────────

export async function fetchSubjects({ lang, difficulty } = {}) {
  const params = {}
  if (lang && lang !== 'All') params.lang = lang
  if (difficulty && difficulty !== 'All') params.difficulty = difficulty
  const { data } = await client.get('/subjects', { params })
  return data
}

export async function fetchSubject(id) {
  const { data } = await client.get(`/subjects/${id}`)
  return data
}

// ── AI ───────────────────────────────────────────────────────────────────────

export async function sendAIMessage({ messages, subjectId, mode, code }) {
  const { data } = await client.post('/ai/chat', {
    messages,
    subjectId: subjectId || '',
    mode: mode || '',
    code: code || '',
  })
  return data
}
