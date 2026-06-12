// StatGrid — server component; six stats from data/content.ts
import { content } from '@/data/content'

const { stats } = content.impact

export default function StatGrid() {
  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div key={i} className="stat">
          <div className="n">
            {s.plus && <span className="plus">{s.plus}</span>}
            {s.number}
            <span className="u">{s.unit}</span>
          </div>
          <div className="l">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
