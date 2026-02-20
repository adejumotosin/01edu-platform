package github

import "github.com/01edu-platform/internal/models"

// Subjects is the local cache of 01-edu curriculum subjects.
// In production, this would be fetched from the GitHub API and cached.
var Subjects = []models.Subject{
	{
		ID: "ascii-art", Title: "ASCII Art", Lang: "Go", Difficulty: "Beginner",
		Tags:        []string{"strings", "algorithms", "CLI", "file-I/O"},
		Description: "Convert text into graphical ASCII art representations using different banner styles: standard, shadow, and thinkertoy. Each character maps to a multi-line art pattern loaded from a banner file.",
		Objectives: []string{
			"Parse command-line arguments (text + banner style)",
			"Read and parse banner text files",
			"Map each character to its ASCII art equivalent (8 lines tall)",
			"Handle special characters: newlines, spaces",
			"Print the composed art to stdout",
		},
		Example:  "$ go run . \"Hello\" standard\n _    _          _   _\n| |  | |        | | | |\n| |__| |   ___  | | | |  ___\n|  __  |  / _ \\ | | | | / _ \\\n| |  | | |  __/ | | | || (_) |\n|_|  |_|  \\___| |_| |_| \\___/",
		RepoPath: "subjects/ascii-art",
	},
	{
		ID: "ascii-art-web", Title: "ASCII Art Web", Lang: "Go", Difficulty: "Beginner",
		Tags:        []string{"HTTP", "web", "templates", "forms"},
		Description: "Build an HTTP web server around your ascii-art program. Users submit text via an HTML form and receive the ASCII art rendered back in the browser.",
		Objectives: []string{
			"Create an HTTP server using net/http",
			"Render HTML templates with Go's html/template",
			"Handle POST form data",
			"Serve static files (CSS, JS)",
			"Return proper HTTP status codes",
		},
		Example:  "POST /ascii-art\nbody: text=Hello&banner=standard\n\nResponse: HTML page with rendered ASCII art",
		RepoPath: "subjects/ascii-art-web",
	},
	{
		ID: "go-reloaded", Title: "Go Reloaded", Lang: "Go", Difficulty: "Beginner",
		Tags:        []string{"strings", "regex", "text-processing", "CLI"},
		Description: "A text completion and modification tool. Apply transformations to a string using inline flags like (up), (low), (cap), (hex), (bin), (punct).",
		Objectives: []string{
			"Parse transformation flags in a string",
			"Implement (up), (low), (cap) for case changes",
			"Implement (hex) and (bin) number base conversion",
			"Handle punctuation correction (spacing around . , ! ? : ;)",
			"Fix 'a' → 'an' before vowels",
		},
		Example:  "Input:  \"1E (hex) files were added\"\nOutput: \"30 files were added\"\n\nInput:  \"It was the best of times (up, 3)\"\nOutput: \"It was the BEST OF TIMES\"",
		RepoPath: "subjects/go-reloaded",
	},
	{
		ID: "math-skills", Title: "Math Skills", Lang: "Go", Difficulty: "Beginner",
		Tags:        []string{"math", "statistics", "CLI", "file-I/O"},
		Description: "Read a list of numbers from a file and compute Average, Median, Variance, and Standard Deviation. All results rounded to the nearest integer.",
		Objectives: []string{
			"Read and parse a file of numbers (one per line)",
			"Compute the arithmetic mean",
			"Compute the median (sort + pick middle)",
			"Compute population variance",
			"Compute standard deviation",
		},
		Example:  "$ go run . data.txt\nAverage: 35\nMedian: 4\nVariance: 1452\nStandard Deviation: 38",
		RepoPath: "subjects/math-skills",
	},
	{
		ID: "lem-in", Title: "Lem-In", Lang: "Go", Difficulty: "Advanced",
		Tags:        []string{"graphs", "BFS", "pathfinding", "algorithms"},
		Description: "An ant farm simulation. Given a weighted graph of rooms and tunnels, move N ants from ##start to ##end in the minimum number of turns using augmenting paths.",
		Objectives: []string{
			"Parse the custom Lem-In file format",
			"Build an adjacency graph of rooms and links",
			"Find multiple non-colliding augmenting paths (Edmonds-Karp / BFS)",
			"Simulate ants moving turn by turn",
			"Output moves in the correct format: Lx-room",
		},
		Example:  "$ go run . example.txt\nL1-2 L2-3\nL1-4 L2-2 L3-3\n\n3 ants reach ##end in 3 turns",
		RepoPath: "subjects/lem-in",
	},
	{
		ID: "groupie-tracker", Title: "Groupie Tracker", Lang: "Go", Difficulty: "Intermediate",
		Tags:        []string{"REST-API", "JSON", "HTTP-server", "templates"},
		Description: "Consume the Groupie Trackers REST API about music bands. Build a website that displays artists, their concert locations on a map, and tour dates — all from live API data.",
		Objectives: []string{
			"Fetch and decode JSON from multiple API endpoints concurrently",
			"Build a Go HTTP server with html/template",
			"Display artist cards with images",
			"Show concert locations and dates per artist",
			"Handle API errors and loading states",
		},
		Example:  "API: https://groupietrackers.herokuapp.com/api\nEndpoints: /artists  /locations  /dates  /relation",
		RepoPath: "subjects/groupie-tracker",
	},
	{
		ID: "forum", Title: "Forum", Lang: "Go", Difficulty: "Intermediate",
		Tags:        []string{"SQLite", "auth", "sessions", "cookies", "Docker"},
		Description: "A full web forum with user registration/login, posts, comments, categories, likes/dislikes, and content filtering. Persisted in SQLite.",
		Objectives: []string{
			"Design a normalized SQLite schema",
			"Implement session-based authentication with secure cookies",
			"CRUD for posts, comments, categories",
			"Like/dislike system for posts and comments",
			"Filter posts by category, created posts, liked posts",
			"Dockerize the application",
		},
		Example:  "Features: Register · Login · Post · Comment · Like · Filter\nStorage: SQLite  Auth: Sessions + Cookies\nDeploy: Docker",
		RepoPath: "subjects/forum",
	},
	{
		ID: "real-time-forum", Title: "Real-Time Forum", Lang: "Go", Difficulty: "Advanced",
		Tags:        []string{"WebSockets", "SQLite", "SPA", "real-time"},
		Description: "Upgrade the forum with WebSockets. Add a single-page JS frontend, real-time private messaging between users, live online user list, and instant notifications.",
		Objectives: []string{
			"Implement a WebSocket server in Go (gorilla/websocket)",
			"Build a single-page application in vanilla JS (no frameworks)",
			"Real-time private messaging with message history",
			"Online/offline user status broadcast",
			"Throttle chat history: 10 messages, load more on scroll",
		},
		Example:  "ws://localhost:8080/ws\n→ Events: new_message | user_online | user_offline | notification",
		RepoPath: "subjects/real-time-forum",
	},
	{
		ID: "social-network", Title: "Social Network", Lang: "Go", Difficulty: "Expert",
		Tags:        []string{"Next.js", "Go", "WebSockets", "Docker", "full-stack"},
		Description: "A complete Facebook-like social network: profiles, follow system, public/private posts, groups, events, real-time group chat, and notifications. Full-stack with Next.js + Go.",
		Objectives: []string{
			"Next.js frontend with SSR",
			"Go REST API backend",
			"WebSocket server for real-time features",
			"JWT authentication",
			"Follow/follower system with privacy controls",
			"Groups with invitations and events",
			"Docker Compose orchestration",
		},
		Example:  "Stack: Next.js + Go + SQLite + WebSockets\nDeploy: docker-compose up",
		RepoPath: "subjects/social-network",
	},
	{
		ID: "graphql", Title: "GraphQL Profile", Lang: "Go/JS", Difficulty: "Intermediate",
		Tags:        []string{"GraphQL", "JWT", "SVG", "data-viz"},
		Description: "Build a personal profile page that authenticates via JWT and queries your school's GraphQL API. Visualize your learning stats (XP, audit ratio, project grades) as interactive SVG charts.",
		Objectives: []string{
			"Authenticate with JWT (username:password → Base64)",
			"Write GraphQL queries for user data",
			"Generate SVG charts: line graph, bar chart, pie chart",
			"Display XP progression over time",
			"Show audit ratio and project pass/fail stats",
		},
		Example:  "query { user { login auditRatio xpAmount\n  progresses { grade object { name } } } }",
		RepoPath: "subjects/graphql",
	},
	{
		ID: "make-your-game", Title: "Make Your Game", Lang: "JavaScript", Difficulty: "Intermediate",
		Tags:        []string{"DOM", "game", "60fps", "vanilla-JS", "animation"},
		Description: "Build a playable browser game using ONLY vanilla JavaScript and the DOM. No canvas libraries, no frameworks. Must maintain 60fps, have a score system, and multiple lives.",
		Objectives: []string{
			"Implement a 60fps game loop with requestAnimationFrame",
			"Collision detection without a physics engine",
			"Score and lives tracking",
			"Game states: menu, playing, game-over",
			"DOM manipulation only — no <canvas> allowed",
		},
		Example:  "Playable game at 60fps in browser\nNo external libraries or canvas APIs",
		RepoPath: "subjects/make-your-game",
	},
	{
		ID: "bomberman-dom", Title: "Bomberman DOM", Lang: "JavaScript", Difficulty: "Expert",
		Tags:        []string{"game", "multiplayer", "mini-framework", "WebSockets"},
		Description: "Recreate Bomberman in the browser with 2–4 player support. The twist: you must first build your own mini JavaScript framework (like a tiny React), then use it to build the game.",
		Objectives: []string{
			"Build a virtual DOM diffing framework from scratch",
			"Implement grid-based movement and bomb mechanics",
			"Multiplayer via WebSockets",
			"Power-ups: extra bombs, increased range, speed boost",
			"Countdown lobby: game starts when all players ready",
		},
		Example:  "2-4 players | Bomberman mechanics\nBuilt with: your own mini-framework + WebSockets",
		RepoPath: "subjects/bomberman-dom",
	},
	{
		ID: "mini-framework", Title: "Mini Framework", Lang: "JavaScript", Difficulty: "Advanced",
		Tags:        []string{"virtual-DOM", "diffing", "routing", "state-management"},
		Description: "Build your own JavaScript UI framework from scratch. Implement virtual DOM creation, diffing, patching, component state management, and client-side routing.",
		Objectives: []string{
			"createElement() — create virtual DOM nodes",
			"render() — mount vDOM to real DOM",
			"diff() + patch() — efficient DOM updates",
			"State management with reactive re-renders",
			"Client-side router with history API",
		},
		Example:  "const el = createElement('div', {class:'app'}, 'Hello')\nrender(el, document.body)\nsetState({count: 1}) // → triggers re-render",
		RepoPath: "subjects/mini-framework",
	},
	{
		ID: "clonernews", Title: "Cloner News", Lang: "JavaScript", Difficulty: "Intermediate",
		Tags:        []string{"API", "Firebase", "real-time", "DOM", "Hacker-News"},
		Description: "A pixel-perfect Hacker News clone using the official HN Firebase REST API. Live feed updates every 5 seconds. Recursive comment threads. User profiles. No frameworks.",
		Objectives: []string{
			"Fetch from Firebase REST API",
			"Render recursive comment trees",
			"Auto-refresh top stories every 5 seconds",
			"User profile pages",
			"Loading skeletons and error states",
		},
		Example:  "GET https://hacker-news.firebaseio.com/v0/topstories.json\n→ Refresh every 5s | Recursive comments | User pages",
		RepoPath: "subjects/clonernews",
	},
	{
		ID: "crud-master", Title: "CRUD Master", Lang: "Go", Difficulty: "Intermediate",
		Tags:        []string{"microservices", "REST-API", "Docker", "PostgreSQL"},
		Description: "Build a microservices-based movie streaming backend. Three services — API gateway, inventory service, billing service — each in their own container.",
		Objectives: []string{
			"Design 3 independent microservices",
			"Implement an API gateway routing pattern",
			"PostgreSQL for each service's data",
			"Docker Compose orchestration",
			"Inter-service HTTP communication",
		},
		Example:  "Services: api-gateway · movie-service · billing-service\nEach containerized with its own PostgreSQL instance",
		RepoPath: "subjects/crud-master",
	},
	{
		ID: "play-with-containers", Title: "Play With Containers", Lang: "DevOps", Difficulty: "Intermediate",
		Tags:        []string{"Docker", "containers", "networking", "volumes", "orchestration"},
		Description: "A structured series of Docker challenges progressing from single containers to multi-service orchestration with networking, volumes, and health checks.",
		Objectives: []string{
			"Run and configure containers",
			"Build custom Docker images",
			"Multi-container networking",
			"Volume management and data persistence",
			"Docker Compose multi-service setups",
		},
		Example:  "Level 1: docker run hello-world\nLevel 5: docker-compose up (3-service app)\nLevel 8: Networking + volumes + health checks",
		RepoPath: "subjects/play-with-containers",
	},
}

// GetSubjectByID finds a subject by its ID
func GetSubjectByID(id string) (*models.Subject, bool) {
	for _, s := range Subjects {
		if s.ID == id {
			return &s, true
		}
	}
	return nil, false
}
