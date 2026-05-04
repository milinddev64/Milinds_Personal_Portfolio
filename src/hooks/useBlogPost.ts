import { useState, useEffect } from 'react'
import { fetchPostBySlug } from '@/lib/contentful'
import type { BlogPost } from '@/types'

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchPostBySlug(slug)
      .then((data) => {
        if (!cancelled) {
          setPost(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Failed to load blog post.')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { post, loading, error }
}
