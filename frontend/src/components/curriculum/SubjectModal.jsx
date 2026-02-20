import { useEffect } from 'react'
import AIChat from '../ai/AIChat'
import styles from './SubjectModal.module.css'

const DIFF_COLOR = {
  Beginner:     'var(--diff-beginner)',
  Intermediate: 'var(--diff-intermediate)',
  Advanced:     'var(--diff-advanced)',
  Expert:       'var(--diff-expert)',
}

export default function SubjectModal({ subject, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const diffColor = DIFF_COLOR[subject.difficulty]

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        {/* Left: Subject info */}
        <div className={styles.left}>
          <div className={styles.leftHeader}>
            <div className={styles.meta}>
              <span className={styles.lang}>{subject.lang}</span>
              <span className={styles.diff} style={{ color: diffColor }}>
                ▸ {subject.difficulty}
              </span>
            </div>
            <button className={styles.closeBtn} onClick={onClose}>✕</button>
          </div>

          <h2 className={styles.title}>{subject.title}</h2>
          <p className={styles.desc}>{subject.description}</p>

          <div className={styles.tags}>
            {subject.tags.map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>◈ Objectives</div>
            <ul className={styles.objectives}>
              {subject.objectives.map((obj, i) => (
                <li key={i}>
                  <span className={styles.objNum} style={{ color: diffColor }}>{String(i+1).padStart(2,'0')}</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>◇ Example</div>
            <pre className={styles.example}>{subject.example}</pre>
          </div>

          <div className={styles.repoBar}>
            <span className={styles.repoLabel}>Repository</span>
            <a
              className={styles.repoLink}
              href={`https://github.com/01-edu/public/tree/master/${subject.repoPath}`}
              target="_blank"
              rel="noreferrer"
            >
              01-edu/public/{subject.repoPath} ↗
            </a>
          </div>
        </div>

        {/* Right: AI */}
        <div className={styles.right}>
          <AIChat
            subjectId={subject.id}
            subjectTitle={subject.title}
            compact
          />
        </div>
      </div>
    </div>
  )
}
