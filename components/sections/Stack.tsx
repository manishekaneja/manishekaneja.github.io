// Stack section — verbatim from A2 Portfolio.html lines 288–298
import SkillGroup from '@/components/SkillGroup'

export default function Stack() {
  return (
    <section id="stack" className="block">
      <div className="sec-head">
        <span className="num">03</span>
        <h2>Stack</h2>
        <span className="line"></span>
      </div>
      <div className="stack-grid">
        <SkillGroup
          label="Languages"
          chips={['Kotlin', 'Java', 'Go', 'TypeScript', 'JavaScript', 'Python']}
        />
        <SkillGroup
          label="Android"
          chips={['Jetpack Compose', 'Android SDK', 'Coroutines', 'Flow', 'RecyclerView', 'Fragments', 'Custom Views']}
        />
        <SkillGroup
          label="Architecture"
          chips={['Modularization', 'MVVM', 'Server-Driven UI', 'State Management', 'Design Systems']}
        />
        <SkillGroup
          label="Performance"
          chips={['Perfetto', 'Instrumentation', 'R8 / ProGuard', 'Optimization']}
        />
        <SkillGroup
          label="Networking & Data"
          chips={['Retrofit', 'OkHttp', 'API Integration', 'Offline Storage']}
        />
        <SkillGroup
          label="Tooling"
          chips={['Git', 'Gradle', 'GitHub Actions', 'CI/CD', 'Grafana', 'LaunchDarkly', 'Firebase / FCM', 'Datadog']}
        />
      </div>
    </section>
  )
}
