package ai

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/01edu-platform/internal/github"
	"github.com/01edu-platform/internal/models"
)

const groqAPI = "https://api.groq.com/openai/v1/chat/completions"
const groqModel = "llama-3.3-70b-versatile"

type groqMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type groqRequest struct {
	Model     string        `json:"model"`
	MaxTokens int           `json:"max_tokens"`
	Messages  []groqMessage `json:"messages"`
}

type groqResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error,omitempty"`
}

func buildSystemPrompt(req models.AIRequest) string {
	base := "You are an expert coding tutor for the 01-edu platform.\n"
	base += "Modes: EXPLAIN=architecture only, SOLVE=full working code, HINT=nudge no code, REVIEW=critique code.\n"
	base += "Use idiomatic Go or modern JS. Be encouraging and educational.\n"

	if req.SubjectID != "" {
		subject, found := github.GetSubjectByID(req.SubjectID)
		if found {
			base += fmt.Sprintf("PROJECT: %s | Lang: %s | Difficulty: %s\n", subject.Title, subject.Lang, subject.Difficulty)
			base += fmt.Sprintf("Description: %s\n", subject.Description)
			for i, obj := range subject.Objectives {
				base += fmt.Sprintf("%d. %s\n", i+1, obj)
			}
			base += fmt.Sprintf("Example:\n%s\n", subject.Example)
		}
	}

	if req.Mode != "" {
		base += fmt.Sprintf("ACTIVE MODE: %s\n", req.Mode)
	}

	if req.Code != "" {
		base += fmt.Sprintf("USER CODE:\n%s\n", req.Code)
	}

	return base
}

func Complete(req models.AIRequest) (string, error) {
	apiKey := os.Getenv("GROQ_API_KEY")
	if apiKey == "" {
		return "", fmt.Errorf("GROQ_API_KEY not set")
	}

	msgs := []groqMessage{
		{Role: "system", Content: buildSystemPrompt(req)},
	}
	for _, m := range req.Messages {
		msgs = append(msgs, groqMessage{Role: m.Role, Content: m.Content})
	}

	payload := groqRequest{
		Model:     groqModel,
		MaxTokens: 2048,
		Messages:  msgs,
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	httpReq, err := http.NewRequest("POST", groqAPI, bytes.NewReader(body))
	if err != nil {
		return "", err
	}
	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("Authorization", "Bearer "+apiKey)

	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var result groqResponse
	if err := json.Unmarshal(data, &result); err != nil {
		return "", err
	}

	if result.Error != nil {
		return "", fmt.Errorf("groq error: %s", result.Error.Message)
	}

	if len(result.Choices) > 0 {
		return result.Choices[0].Message.Content, nil
	}

	return "", fmt.Errorf("no content in response")
}
