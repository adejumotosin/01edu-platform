import styles from './About.module.css'

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.badge}>ABOUT</div>
      <h1 className={styles.title}>01 Edu Learning Platform</h1>
      <p className={styles.lead}>
        An open learning interface built on top of the <a className={styles.link} href="https://github.com/01-edu/public" target="_blank" rel="noreferrer">01-edu/public</a> repository — the real curriculum used at coding schools across Europe and Africa.
      </p>

      <div className={styles.grid}>
        {[
          { icon: '◈', title: 'Real Curriculum',   desc: 'Projects from Zone01, Gritlab, 01Founders. Not toy exercises — full engineering challenges.' },
          { icon: '◉', title: 'AI-Powered Tutor',  desc: 'Claude powers 4 specialized modes: Explain, Full Solution, Hint-only, and Code Review.' },
          { icon: '◇', title: 'Go + React Stack',  desc: 'Go backend handles AI proxying and subject management. React frontend with CSS Modules.' },
          { icon: '◌', title: 'Progress Tracking', desc: 'Mark projects as Todo, Doing, or Done. Stored locally in your browser.' },
        ].map(f => (
          <div key={f.title} className={styles.card}>
            <span className={styles.cardIcon}>{f.icon}</span>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.stack}>
        <div className={styles.stackTitle}>Stack</div>
        <div className={styles.stackItems}>
          {[
            { label: 'Frontend', tech: 'React 18 + Vite + CSS Modules' },
            { label: 'Backend',  tech: 'Go 1.22 + gorilla/mux' },
            { label: 'AI',       tech: 'Anthropic Claude (claude-sonnet-4)' },
            { label: 'State',    tech: 'Zustand + localStorage' },
            { label: 'Markdown', tech: 'react-markdown + react-syntax-highlighter' },
          ].map(s => (
            <div key={s.label} className={styles.stackItem}>
              <span className={styles.stackLabel}>{s.label}</span>
              <span className={styles.stackTech}>{s.tech}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.setup}>
        <div className={styles.setupTitle}>Setup</div>
        <pre className={styles.code}>{`# 1. Clone
git clone https://github.com/01-edu/public

# 2. Set your API key
export ANTHROPIC_API_KEY=sk-ant-...

# 3. Start Go backend
cd backend && go run ./cmd/server

# 4. Start React frontend
cd frontend && npm install && npm run dev

# Open http://localhost:5173`}</pre>
      </div>
    </div>
  )
}
