package models

// Subject represents a 01-edu project subject
type Subject struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Lang        string   `json:"lang"`
	Difficulty  string   `json:"difficulty"`
	Tags        []string `json:"tags"`
	Description string   `json:"description"`
	Objectives  []string `json:"objectives"`
	Example     string   `json:"example"`
	RepoPath    string   `json:"repoPath"`
}

// AIRequest is the payload sent by the frontend to the AI endpoint
type AIRequest struct {
	Messages  []Message `json:"messages"`
	SubjectID string    `json:"subjectId,omitempty"`
	Mode      string    `json:"mode"` // "explain" | "solve" | "hint" | "review"
	Code      string    `json:"code,omitempty"` // for review mode
}

// Message is a chat message
type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// AIResponse is returned from the AI endpoint
type AIResponse struct {
	Content string `json:"content"`
	Mode    string `json:"mode"`
}

// ProgressEntry tracks a user's progress on a subject
type ProgressEntry struct {
	SubjectID string `json:"subjectId"`
	Status    string `json:"status"` // "todo" | "doing" | "done"
}

// UserProgress is the full progress map
type UserProgress struct {
	Items map[string]string `json:"items"` // subjectId -> status
}
