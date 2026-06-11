import Sidebar from '@/components/Sidebar'

// S3 will fill in section content inside <main class="content">
export default function Home() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        {/* Sections built by S3: Intro, Impact, SelectedWork, Stack, About, Contact */}
      </main>
    </div>
  )
}
