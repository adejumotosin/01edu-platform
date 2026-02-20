package api

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/01edu-platform/internal/ai"
	"github.com/01edu-platform/internal/github"
	"github.com/01edu-platform/internal/models"
	"github.com/gorilla/mux"
)

// NewRouter creates and configures the API router
func NewRouter() *mux.Router {
	r := mux.NewRouter()

	// API v1
	api := r.PathPrefix("/api/v1").Subrouter()

	// Subjects
	api.HandleFunc("/subjects", handleGetSubjects).Methods("GET")
	api.HandleFunc("/subjects/{id}", handleGetSubject).Methods("GET")

	// AI
	api.HandleFunc("/ai/chat", handleAIChat).Methods("POST")

	// Health
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	}).Methods("GET")

	return r
}

// ── Subjects ─────────────────────────────────────────────────────────────────

func handleGetSubjects(w http.ResponseWriter, r *http.Request) {
	lang := r.URL.Query().Get("lang")
	difficulty := r.URL.Query().Get("difficulty")

	subjects := github.Subjects
	if lang != "" || difficulty != "" {
		var filtered []models.Subject
		for _, s := range subjects {
			if (lang == "" || s.Lang == lang) && (difficulty == "" || s.Difficulty == difficulty) {
				filtered = append(filtered, s)
			}
		}
		subjects = filtered
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"subjects": subjects,
		"count":    len(subjects),
	})
}

func handleGetSubject(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	subject, found := github.GetSubjectByID(id)
	if !found {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "subject not found"})
		return
	}

	writeJSON(w, http.StatusOK, subject)
}

// ── AI ───────────────────────────────────────────────────────────────────────

func handleAIChat(w http.ResponseWriter, r *http.Request) {
	var req models.AIRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	if len(req.Messages) == 0 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "messages array is required"})
		return
	}

	// Validate mode
	validModes := map[string]bool{"explain": true, "solve": true, "hint": true, "review": true, "": true}
	if !validModes[req.Mode] {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid mode"})
		return
	}

	content, err := ai.Complete(req)
	if err != nil {
		log.Printf("AI error: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "AI service unavailable"})
		return
	}

	writeJSON(w, http.StatusOK, models.AIResponse{
		Content: content,
		Mode:    req.Mode,
	})
}

// ── Helpers ──────────────────────────────────────────────────────────────────

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Printf("failed to encode response: %v", err)
	}
}
