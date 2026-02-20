import { useEffect, useState } from 'react'
import { fetchSubjects } from '../lib/api'
import { useProgressStore } from '../lib/store'
import styles from './Progress.module.css'

const STATUS_CONFIG = {
  todo:  { label: 'Todo',  icon: '○', color: 'var(--text3)', bg: 'var(--bg3)' },
  doing: { label: 'Doing', icon: '⚡', color: 'var(--amber)', bg: 'var(--amber-dim)' },
  done:  { label: 'Done',  icon: '✓', color: 'var(--green)', bg: 'var(--green-dim)' },
}

export default function ProgressPage() {
  const [subjects, setSubjects] = useState([])
  const progress = useProgressStore(s => s.progress)
  const cycleStatus = useProgressStore(s => s.cycleStatus)
  const values = Object.values(progress)
  const s = {
    done:  values.filter(v => v === 'done').length,
    doing: values.filter(v => v === 'doing').length,
    todo:  values.filter(v => v === 'todo').length,
  }

  useEffect(() => {
    fetchSubjects().then(d => setSubjects(d.subjects || []))
  }, [])

  const pct = subjects.length ? Math.round((s.done / subjects.length) * 100) : 0
  const getStatus = (id) => progress[id] || 'todo'

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.badge}>YOUR PROGRESS</div>
        <h1 className={styles.title}>Learning dashboard</h1>
        <p className={styles.sub}>
          Click the status button on any project to cycle through Todo → Doing → Done. Progress is saved locally.
        </p>
        <div className={styles.summaryCards}>
          <SummaryCard label="Completed"   value={s.done}  color="var(--green)" icon="✓" />
          <SummaryCard label="In Progress" value={s.doing} color="var(--amber)" icon="⚡" />
          <SummaryCard label="Remaining"   value={subjects.length - s.done - s.doing} color="var(--text3)" icon="○" />
          <div className={styles.pctCard}>
            <div className={styles.pctNum} style={{ color: pct === 100 ? 'var(--green)' : 'var(--amber)' }}>
              {pct}%
            </div>
            <div className={styles.pctLabel}>Complete</div>
            <div className={styles.pctBar}>
              <div className={styles.pctFill} style={{ width: `${pct}%`, background: pct === 100 ? 'var(--green)' : 'var(--amber)' }} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        {['doing', 'todo', 'done'].map(group => {
          const groupSubjects = subjects.filter(s => getStatus(s.id) === group)
          if (groupSubjects.length === 0) return null
          const cfg = STATUS_CONFIG[group]
          return (
            <div key={group} className={styles.group}>
              <div className={styles.groupLabel} style={{ color: cfg.color }}>
                {cfg.icon} {cfg.label} ({groupSubjects.length})
              </div>
              <div className={styles.cards}>
                {groupSubjects.map(s => (
                  <ProgressCard
                    key={s.id}
                    subject={s}
                    status={group}
                    onCycle={() => cycleStatus(s.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SummaryCard({ label, value, color, icon }) {
  return (
    <div className={styles.summaryCard}>
      <span style={{ fontSize: 22, color }}>{icon}</span>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 32, fontWeight: 700, color }}>{value}</span>
      <span style={{ fontSize: 12, color: 'var(--text3)' }}>{label}</span>
    </div>
  )
}

function ProgressCard({ subject, status, onCycle }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <div className={styles.card} style={{ borderLeft: `3px solid ${cfg.color}` }}>
      <div className={styles.cardInfo}>
        <div className={styles.cardTitle}>{subject.title}</div>
        <div className={styles.cardMeta}>{subject.lang} · {subject.difficulty}</div>
      </div>
      <button
        className={styles.statusBtn}
        style={{ color: cfg.color, background: cfg.bg, borderColor: `${cfg.color}44` }}
        onClick={onCycle}
        title="Click to cycle status"
      >
        {cfg.icon} {cfg.label}
      </button>
    </div>
  )
}
