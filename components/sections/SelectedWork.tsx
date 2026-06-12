// SelectedWork section — content from data/content.ts
import Job from '@/components/Job'
import { content, rich } from '@/data/content'

const { jobs } = content.work

export default function SelectedWork() {
  return (
    <section id="work" className="block">
      <div className="sec-head">
        <span className="num">02</span>
        <h2>Selected Work</h2>
        <span className="line"></span>
      </div>
      <div className="work">
        {jobs.map((job, i) => (
          <Job
            key={i}
            tag={job.tag}
            company={job.company}
            meta={job.meta}
            title={job.title}
            titleline={job.titleline}
            bullets={job.bullets.map((b) => rich(b))}
          />
        ))}
      </div>
    </section>
  )
}
