import { useProgressStore } from '../../lib/store'
import styles from './SubjectCard.module.css'

const DIFF_COLOR = {
  Beginner:     'var(--diff-beginner)',
  Intermediate: 'var(--diff-intermediate)',
  Advanced:     'var(--diff-advanced)',
  Expert:       'var(--diff-expert)',
}

const LANG_COLOR = {
  Go:       'var(--blue)',
  JavaScript: '#f7df1e',
  'Go/JS':  'var(--purple)',
  DevOps:   '#60a5fa',
  Rust:     '#f97316',
}

const STATUS_CONFIG = {
  todo:  { label: '○ Todo',   color: 'var(--text3)' },
  doing: { label: '⚡ Doing',  color: 'var(--amber)' },
  done:  { label: '✓ Done',   color: 'var(--green)' },
}

export default function SubjectCard({ subject, onClick }) {
  const status = useProgressStore(state => state.progress[subject.id] || 'todo')
  const cycleStatus = useProgressStore(state => state.cycleStatus)
  const statusCfg = STATUS_CONFIG[status]
  const diffColor = DIFF_COLOR[subject.difficulty]
  const langColor = LANG_COLOR[subject.lang] || 'var(--text2)'

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Accent bar */}
      <div className={styles.accent} style={{ background: diffColor }} />

      <div className={styles.body}>
        {/* Top row */}
        <div className={styles.top}>
          <span className={styles.lang} style={{ color: langColor, borderColor: `${langColor}44` }}>
            {subject.lang}
          </span>
          <span className={styles.diff} style={{ color: diffColor }}>
            {subject.difficulty}
          </span>
        </div>

        {/* Title & desc */}
        <h3 className={styles.title}>{subject.title}</h3>
        <p className={styles.desc}>{subject.description.slice(0, 110)}…</p>

        {/* Tags */}
        <div className={styles.tags}>
          {subject.tags.slice(0, 4).map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.cta}>Open + AI Help →</span>
          <button
            className={styles.statusBtn}
            style={{ color: statusCfg.color, borderColor: `${statusCfg.color}44` }}
            onClick={e => { e.stopPropagation(); cycleStatus(subject.id) }}
            title="Click to cycle status"
          >
            {statusCfg.label}
          </button>
        </div>
      </div>
    </div>
  )
}
