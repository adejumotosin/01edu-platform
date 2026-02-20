import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useAI } from '../../hooks/useAI'
import styles from './AIChat.module.css'

const MODES = [
  { id: 'explain', icon: '◉', label: 'Explain', desc: 'Break down the project' },
  { id: 'solve',   icon: '◈', label: 'Full Solution', desc: 'Complete working code' },
  { id: 'hint',    icon: '◇', label: 'Hint',    desc: 'Nudge, no spoilers' },
  { id: 'review',  icon: '◌', label: 'Review',  desc: 'Critique my code' },
]

const QUICK_PROMPTS = [
  "What's the best approach?",
  "Where do I start?",
  "What are common mistakes?",
  "Show me the data structures I need",
  "Write me tests for this",
]

export default function AIChat({ subjectId, subjectTitle, compact = false }) {
  const { messages, loading, send, clear } = useAI(subjectId)
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('')
  const [code, setCode] = useState('')
  const [showCodeInput, setShowCodeInput] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = () => {
    const text = input.trim()
    if (!text || loading) return
    send(text, { mode, code: showCodeInput ? code : '' })
    setInput('')
  }

  const handleModeQuick = (m) => {
    const prompts = {
      explain: `Explain the "${subjectTitle || 'this'}" project — what am I building and why?`,
      solve:   `Give me a complete solution for "${subjectTitle || 'this project'}" with explanations.`,
      hint:    `Give me a hint for "${subjectTitle || 'this project'}" — no full solution, just point me in the right direction.`,
      review:  showCodeInput && code
        ? `Please review my code for "${subjectTitle || 'this project'}".`
        : null,
    }
    const text = prompts[m]
    if (!text) return
    setMode(m)
    send(text, { mode: m, code: m === 'review' ? code : '' })
  }

  return (
    <div className={`${styles.panel} ${compact ? styles.compact : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.liveIndicator} />
          <span className={styles.title}>AI Assistant</span>
        </div>
        <div className={styles.headerRight}>
          {messages.length > 0 && (
            <button className={styles.clearBtn} onClick={clear} title="Clear chat">
              ⊘ Clear
            </button>
          )}
        </div>
      </div>

      {/* Mode selector */}
      <div className={styles.modes}>
        {MODES.map(m => (
          <button
            key={m.id}
            className={`${styles.modeBtn} ${mode === m.id ? styles.modeActive : ''}`}
            onClick={() => {
              setMode(prev => prev === m.id ? '' : m.id)
              if (m.id === 'review') setShowCodeInput(v => !v)
              else setShowCodeInput(false)
            }}
            title={m.desc}
          >
            <span>{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Code input for review mode */}
      {showCodeInput && (
        <div className={styles.codeInputWrap}>
          <textarea
            className={styles.codeInput}
            placeholder="// Paste your code here for review..."
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={6}
          />
        </div>
      )}

      {/* Messages */}
      <div className={styles.messages}>
        {messages.length === 0 && !loading && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>◈</div>
            <p>Select a mode above or type your question.</p>
            {subjectTitle && (
              <p className={styles.emptySubject}>Working on: <strong>{subjectTitle}</strong></p>
            )}
            <div className={styles.quickPrompts}>
              {QUICK_PROMPTS.map(q => (
                <button key={q} className={styles.quickBtn} onClick={() => send(q, { mode })}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {loading && (
          <div className={`${styles.bubble} ${styles.assistant}`}>
            <div className={styles.typing}>
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <textarea
            ref={inputRef}
            className={styles.input}
            placeholder={
              mode
                ? `Ask in ${MODES.find(m => m.id === mode)?.label} mode...`
                : 'Ask anything about this project...'
            }
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            rows={2}
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            ↑
          </button>
        </div>
        <div className={styles.modeQuick}>
          {MODES.map(m => (
            <button
              key={m.id}
              className={styles.modeQuickBtn}
              onClick={() => handleModeQuick(m.id)}
              disabled={loading}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`${styles.msgRow} ${isUser ? styles.userRow : styles.assistantRow}`}>
      {!isUser && <span className={styles.avatar}>◉</span>}
      <div className={`${styles.bubble} ${isUser ? styles.user : styles.assistant}`}>
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const lang = (className || '').replace('language-', '')
                return !inline ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={lang || 'text'}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={styles.inlineCode} {...props}>{children}</code>
                )
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
      {isUser && <span className={styles.avatar} style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}>◇</span>}
    </div>
  )
}
