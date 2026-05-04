import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FaArrowLeft, FaClock, FaTag } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useBlogPost } from '@/hooks/useBlogPost'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, type Document, type Block, type Inline } from '@contentful/rich-text-types'
import type { ReactNode } from 'react'
import AdBanner from '@/components/AdBanner'

// ─── Ad Slot IDs ─────────────────────────────────────────────────────────────
// Replace these placeholder values with the real Slot IDs from your AdSense
// dashboard once your account is approved:
// AdSense dashboard → Ads → By ad unit → [unit name] → Slot ID
const AD_SLOTS = {
  leftSidebar: 'XXXXXXXXXX',   // Ad unit: "Article Left Sidebar"
  rightSidebar: 'XXXXXXXXXX',  // Ad unit: "Article Right Sidebar"
} as const

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_: unknown, children: ReactNode) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_: unknown, children: ReactNode) => (
      <h2 className="text-2xl font-bold mt-8 mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_: unknown, children: ReactNode) => (
      <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (_: unknown, children: ReactNode) => (
      <p className="mb-4 leading-7 text-foreground/90">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_: unknown, children: ReactNode) => (
      <ul className="list-disc list-inside mb-4 space-y-1 pl-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_: unknown, children: ReactNode) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 pl-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_: unknown, children: ReactNode) => (
      <li className="text-foreground/90">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_: unknown, children: ReactNode) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-border" />,
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { file, title } = (node.data.target as any).fields
      return (
        <img
          src={`https:${file.url}`}
          alt={title}
          className="rounded-xl my-6 w-full object-cover"
          loading="lazy"
        />
      )
    },
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => (
      <a
        href={(node.data as { uri: string }).uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:opacity-80"
      >
        {children}
      </a>
    ),
  },
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { post, loading, error } = useBlogPost(slug ?? '')

  const formattedDate = post?.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* 3-column layout: left ad | article | right ad (sidebars only on xl+) */}
        <div className="flex gap-4 items-start justify-center">

          {/* Left sidebar ad — sticky, follows article as user scrolls */}
          <aside className="hidden xl:block w-[160px] shrink-0 sticky top-24 self-start">
            <AdBanner slot={AD_SLOTS.leftSidebar} format="vertical" />
          </aside>

          {/* Article column */}
          <div className="flex-1 max-w-3xl min-w-0">

            {/* Back button */}
            <Button
              variant="ghost"
              className="mb-6 flex items-center gap-2"
              onClick={() => navigate('/blogs')}
            >
              <FaArrowLeft />
              {t('blogs.backToBlogs')}
            </Button>

            {/* Loading */}
            {loading && (
              <div className="animate-pulse space-y-4">
                <div className="h-64 bg-muted rounded-xl" />
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="space-y-2 mt-6">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="h-4 bg-muted rounded" />
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">{t('blogs.error')}</p>
              </div>
            )}

            {/* Not found */}
            {!loading && !error && !post && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">{t('blogs.noPosts')}</p>
              </div>
            )}

            {/* Post */}
            {!loading && !error && post && (
              <article>
                {/* Cover image */}
                {post.coverImage && (
                  <img
                    src={post.coverImage.url}
                    alt={post.coverImage.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
                  />
                )}

                {/* Category + meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {post.category && (
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">{formattedDate}</span>
                  {post.readTime && (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <FaClock className="h-3.5 w-3.5" />
                      {post.readTime} {t('blogs.minRead')}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

                {/* Excerpt */}
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>

                {/* Divider */}
                <hr className="border-border mb-8" />

                {/* Rich text body */}
                <div className="prose-sm max-w-none">
                  {post.body && documentToReactComponents(post.body as Document, richTextOptions)}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                      >
                        <FaTag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            )}

          </div>

          {/* Right sidebar ad — sticky, follows article as user scrolls */}
          <aside className="hidden xl:block w-[160px] shrink-0 sticky top-24 self-start">
            <AdBanner slot={AD_SLOTS.rightSidebar} format="vertical" />
          </aside>

        </div>
      </div>
    </main>
  )
}

export default BlogDetail
