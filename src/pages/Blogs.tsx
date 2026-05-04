import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

import { useTranslation } from 'react-i18next'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import BlogCard from '@/components/BlogCard'
import AdBanner from '@/components/AdBanner'

// ─── Ad Slot IDs ─────────────────────────────────────────────────────────────
// Replace these placeholder values with the real Slot IDs from your AdSense
// dashboard once your account is approved:
// AdSense dashboard → Ads → By ad unit → [unit name] → Slot ID
const AD_SLOTS = {
  leftSidebar: 'XXXXXXXXXX',   // Ad unit: "Blog Left Sidebar"
  rightSidebar: 'XXXXXXXXXX',  // Ad unit: "Blog Right Sidebar"
  bottomBanner: 'XXXXXXXXXX',  // Ad unit: "Blog Bottom Banner"
} as const

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
      </div>
    </div>
  )
}

const Blogs = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')

  const { posts, loading, error } = useBlogPosts(activeCategory)

  const categories = useMemo(() => {
    // We fetch all posts once without filter to collect categories for tabs
    return [] // populated via allPosts below
  }, [])

  // Fetch all posts once to build category list (unfiltered)
  const { posts: allPosts } = useBlogPosts()
  const allCategories = useMemo(() => {
    const cats = new Set<string>()
    allPosts.forEach((p) => { if (p.category) cats.add(p.category) })
    return Array.from(cats)
  }, [allPosts])

  // suppress unused variable warning
  void categories

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* 3-column layout: left ad | content | right ad (sidebars only on xl+) */}
        <div className="flex gap-4 items-start justify-center">

          {/* Left sidebar ad */}
          <aside className="hidden xl:block w-[160px] shrink-0 sticky top-24 self-start">
            <AdBanner slot={AD_SLOTS.leftSidebar} format="vertical" />
          </aside>

          {/* Main content column */}
          <div className="flex-1 max-w-6xl min-w-0">

            {/* Page header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('blogs.title')}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('blogs.subtitle')}
              </p>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory('all')}
              >
                {t('blogs.allCategories')}
              </Button>
              {allCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">{t('blogs.error')}</p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && posts.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">{t('blogs.noPosts')}</p>
              </div>
            )}

            {/* Grid */}
            {!loading && !error && posts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Bottom banner ad — shown below last card row */}
            {!loading && !error && (
              <AdBanner slot={AD_SLOTS.bottomBanner} format="horizontal" className="mt-10" />
            )}

          </div>

          {/* Right sidebar ad */}
          <aside className="hidden xl:block w-[160px] shrink-0 sticky top-24 self-start">
            <AdBanner slot={AD_SLOTS.rightSidebar} format="vertical" />
          </aside>

        </div>
      </div>
    </main>
  )
}

export default Blogs
