import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { BlogPost } from '@/types'
import { FaArrowRight, FaClock, FaTag } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ''

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer flex flex-col"
      onClick={() => navigate(`/blogs/${post.slug}`)}
    >
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden shrink-0">
        {post.coverImage ? (
          <img
            src={post.coverImage.url}
            alt={post.coverImage.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-3xl font-bold text-muted-foreground/20 px-4 text-center">
              {post.title}
            </p>
          </div>
        )}
        {/* Category badge */}
        {post.category && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
            {post.category}
          </span>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
          <span>{formattedDate}</span>
          {post.readTime && (
            <span className="flex items-center gap-1">
              <FaClock className="h-3 w-3" />
              {post.readTime} {t('blogs.minRead')}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1">
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
              >
                <FaTag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="self-start px-0 text-primary hover:text-primary hover:bg-transparent gap-1"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/blogs/${post.slug}`)
          }}
        >
          {t('blogs.readMore')} <FaArrowRight className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  )
}
