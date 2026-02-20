import AIChat from '../components/ai/AIChat'
import styles from './AIPage.module.css'

export default function AIPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.badge}>AI ASSISTANT</div>
        <h1 className={styles.title}>Your free coding tutor</h1>
        <p className={styles.sub}>
          Get full solutions, architectural explanations, no-spoiler hints, or thorough code reviews for any 01-edu project. Four specialized modes, powered by Claude.
        </p>

        <div className={styles.modes}>
          {[
            { icon: '◉', name: 'Explain', desc: 'Understand what to build and why' },
            { icon: '◈', name: 'Solve',   desc: 'Get a complete working solution' },
            { icon: '◇', name: 'Hint',    desc: 'Get nudged without spoilers' },
            { icon: '◌', name: 'Review',  desc: 'Paste code, get deep feedback' },
          ].map(m => (
            <div key={m.name} className={styles.modeCard}>
              <span className={styles.modeIcon}>{m.icon}</span>
              <span className={styles.modeName}>{m.name}</span>
              <span className={styles.modeDesc}>{m.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chatWrap}>
        <AIChat />
      </div>
    </div>
  )
}
