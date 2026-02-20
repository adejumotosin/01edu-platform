# 01 Edu Learning Platform

A full-stack learning platform built on the [01-edu/public](https://github.com/01-edu/public) open curriculum, with a free AI assistant powered by Claude.

```
┌─────────────────────────────────────────────────────────┐
│  React Frontend (Vite)          Go Backend (gorilla/mux) │
│  ├── Curriculum browser    ←→   ├── GET /api/v1/subjects │
│  ├── AI Chat (4 modes)     ←→   ├── POST /api/v1/ai/chat │
│  ├── Progress tracker           └── Anthropic API proxy  │
│  └── About page                                          │
└─────────────────────────────────────────────────────────┘
```

## Features

| Feature | Description |
|---|---|
| 📚 Curriculum Browser | Browse 16+ real 01-edu projects, filterable by language and difficulty |
| 🤖 AI Assistant | 4 modes: **Explain**, **Full Solution**, **Hint**, **Code Review** |
| ⚡ Progress Tracking | Todo → Doing → Done, saved to localStorage |
| 🎨 Design | Brutalist-terminal dark aesthetic (Syne + JetBrains Mono) |
| 🐳 Docker | Full docker-compose for one-command deployment |

## AI Modes

| Mode | What it does |
|---|---|
| **◉ Explain** | Architecture overview, why this project matters, how to approach it |
| **◈ Solve** | Complete, idiomatic working code with inline comments |
| **◇ Hint** | A nudge in the right direction — no code, just thinking prompts |
| **◌ Review** | Paste your code, get bugs, style issues, and improvement suggestions |

## Quick Start

### Development (recommended)

**Prerequisites:** Go 1.22+, Node.js 20+, an Anthropic API key

```bash
# Clone
git clone <this-repo>
cd 01edu-platform

# Start the Go backend
cd backend
export ANTHROPIC_API_KEY=sk-ant-...
go mod tidy
go run ./cmd/server
# → Running on http://localhost:8080

# In another terminal: start the React frontend
cd frontend
npm install
npm run dev
# → Running on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173)

### Docker (production)

```bash
export ANTHROPIC_API_KEY=sk-ant-...
docker-compose up --build
# Frontend → http://localhost:3000
# Backend  → http://localhost:8080
```

## API Endpoints

```
GET  /api/v1/subjects           → List all subjects (supports ?lang=Go&difficulty=Beginner)
GET  /api/v1/subjects/:id       → Get a single subject by ID
POST /api/v1/ai/chat            → Send a message to the AI
GET  /health                    → Health check
```

### AI Chat Request

```json
{
  "messages": [{ "role": "user", "content": "How do I start this?" }],
  "subjectId": "lem-in",
  "mode": "hint",
  "code": ""
}
```

`mode` options: `"explain"` | `"solve"` | `"hint"` | `"review"` | `""` (general)

## Project Structure

```
01edu-platform/
├── backend/
│   ├── cmd/server/main.go          # Entry point
│   ├── internal/
│   │   ├── api/router.go           # HTTP handlers
│   │   ├── ai/ai.go                # Anthropic API client
│   │   ├── github/subjects.go      # Subject data + lookup
│   │   └── models/models.go        # Shared types
│   ├── Dockerfile
│   └── go.mod
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/             # Sidebar + shell layout
│   │   │   ├── ai/                 # AIChat panel (4 modes)
│   │   │   └── curriculum/         # SubjectCard + SubjectModal
│   │   ├── pages/                  # Curriculum, AIPage, Progress, About
│   │   ├── hooks/useAI.js          # AI chat hook
│   │   ├── lib/
│   │   │   ├── api.js              # Axios API client
│   │   │   └── store.js            # Zustand stores
│   │   └── styles/global.css
│   ├── vite.config.js
│   └── Dockerfile
│
└── docker-compose.yml
```

## Extending

**Add more subjects:** Edit `backend/internal/github/subjects.go` — add entries to the `Subjects` slice.

**Connect to GitHub API:** Replace the static slice with a live fetch from `api.github.com/repos/01-edu/public/contents/subjects`.

**Add user accounts:** Add a PostgreSQL service to docker-compose and a `users` table. Replace localStorage progress with server-side storage.

**Streaming AI responses:** The Anthropic API supports SSE streaming — switch to `http.StreamResponse` in the backend and an `EventSource` in the frontend for real-time token streaming.

## License

Curriculum content belongs to [01-edu](https://github.com/01-edu). This platform code is MIT licensed.
