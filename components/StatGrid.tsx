// StatGrid — server component; six stats inline, verbatim from A2 Portfolio.html lines 201–207

const stats = [
  {
    n: <>4<span className="u">M/day</span></>,
    l: 'orders served by surfaces I build & maintain',
  },
  {
    n: <>99.98<span className="u">%</span></>,
    l: 'crash-free sessions held across releases',
  },
  {
    n: <><span className="plus">+</span>4<span className="u">%</span></>,
    l: 'cart conversion lift (+10% for new users)',
  },
  {
    n: <>20<span className="u">+</span></>,
    l: 'reusable design-system components shipped',
  },
  {
    n: <>3<span className="u">×</span></>,
    l: 'faster load & bind on heavy scrollable screens',
  },
  {
    // U+2212 minus sign
    n: <>{'−12'}<span className="u">%</span></>,
    l: 'cold-start time, −20% first-screen render',
  },
]

export default function StatGrid() {
  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div key={i} className="stat">
          <div className="n">{s.n}</div>
          <div className="l">{s.l}</div>
        </div>
      ))}
    </div>
  )
}
