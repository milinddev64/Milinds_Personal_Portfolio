import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MusicPlayer from '@/components/MusicPlayer'

const Home = lazy(() => import('@/pages/Home'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <MusicPlayer />
      </div>
    </BrowserRouter>
  )
}

export default App