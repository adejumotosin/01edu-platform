import { useState, useEffect } from 'react'
import { fetchSubjects } from '../lib/api'
import SubjectCard from '../components/curriculum/SubjectCard'
import SubjectModal from '../components/curriculum/SubjectModal'
import styles from './Curriculum.module.css'

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert']
const LANGS = ['All', 'Go', 'JavaScript', 'Go/JS', 'DevOps']

export default function CurriculumPage() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const [lang, setLang] = useState('All')

  useEffect(() => {
    fetchSubjects()
      .then(data => setSubjects(data.subjects || []))
      .catch(() => setError('Failed to load subjects. Is the Go backend running?'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = subjects.filter(s => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    const matchDiff = difficulty === 'All' || s.difficulty === difficulty
    const matchLang = lang === 'All' || s.lang === lang
    return matchSearch && matchDiff && matchLang
  })

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.heroDot} />
          01-EDU CURRICULUM
        </div>
        <h1 className={styles.heroTitle}>
          Real engineering<br />challenges, free AI help
        </h1>
        <p className={styles.heroSub}>
          Browse the full 01-edu open curriculum. Click any project to see the spec and get instant AI assistance — explain, solve, hint, or code review.
        </p>
        <div className={styles.heroStats}>
          {[
            { v: subjects.length || 16, l: 'Projects' },
            { v: 5,  l: 'Languages' },
            { v: 4,  l: 'AI Modes' },
            { v: '$0', l: 'Cost' },
          ].map(s => (
            <div key={s.l} className={styles.stat}>
              <span className={styles.statVal}>{s.v}</span>
              <span className={styles.statLabel}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⊙</span>
          <input
            className={styles.search}
            placeholder="Search projects, tags, topics…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        <div className={styles.filterGroups}>
          <FilterGroup label="Difficulty" options={DIFFICULTIES} value={difficulty} onChange={setDifficulty} />
          <FilterGroup label="Language" options={LANGS} value={lang} onChange={setLang} />
        </div>

        <span className={styles.count} suppressHydrationWarning>
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      <div className={styles.content}>
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading curriculum…</p>
          </div>
        )}
        {error && (
          <div className={styles.error}>
            <span>⚠</span> {error}
          </div>
        )}
        {!loading && !error && (
          <div className={styles.grid}>
            {filtered.map((s, i) => (
              <div key={s.id} style={{ animationDelay: `${i * 0.04}s` }}>
                <SubjectCard subject={s} onClick={() => setSelected(s)} />
              </div>
            ))}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className={styles.empty}>
            <div>◌</div>
            <p>No projects match your filters.</p>
          </div>
        )}
      </div>

      {selected && (
        <SubjectModal subject={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>{label}:</span>
      {options.map(opt => (
        <button
          key={opt}
          className={`${styles.filterBtn} ${value === opt ? styles.filterActive : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
