import Sidebar from '@/components/Sidebar'
import Intro from '@/components/sections/Intro'
import Impact from '@/components/sections/Impact'
import SelectedWork from '@/components/sections/SelectedWork'
import Stack from '@/components/sections/Stack'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Intro />
        <Impact />
        <SelectedWork />
        <Stack />
        <About />
        <Contact />
      </main>
    </div>
  )
}
