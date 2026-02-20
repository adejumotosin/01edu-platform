import { NavLink } from 'react-router-dom'
import { useProgressStore } from '../../lib/store'
import styles from './Layout.module.css'

const NAV = [
  { to: '/',         icon: '◈', label: 'Curriculum' },
  { to: '/ai',       icon: '◉', label: 'AI Assistant' },
  { to: '/progress', icon: '◇', label: 'Progress' },
  { to: '/about',    icon: '◌', label: 'About' },
]

export default function Layout({ children }) {
  const progress = useProgressStore(s => s.progress)
  const values = Object.values(progress)
  const stats = {
    done:  values.filter(v => v === 'done').length,
    doing: values.filter(v => v === 'doing').length,
    todo:  values.filter(v => v === 'todo').length,
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>01</span>
          <span className={styles.logoText}>EDU</span>
          <span className={styles.logoDot} />
        </div>
        <nav className={styles.nav}>
          {NAV.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.navIcon}>{icon}</span>
              <span className={styles.navLabel}>{label}</span>
              {label === 'Progress' && stats.done > 0 && (
                <span className={styles.navBadge}>{stats.done}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.miniStats}>
            <StatChip label="Done"   value={stats.done}  color="var(--green)" />
            <StatChip label="Active" value={stats.doing} color="var(--amber)" />
          </div>
          <a
            className={styles.repoLink}
            href="https://github.com/01-edu/public"
            target="_blank"
            rel="noreferrer"
          >
            github/01-edu/public ↗
          </a>
        </div>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

function StatChip({ label, value, color }) {
  return (
    <div className={styles.chip}>
      <span style={{ color, fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700 }}>
        {value}
      </span>
      <span style={{ fontSize: 11, color: 'var(--text3)' }}>{label}</span>
    </div>
  )
}
