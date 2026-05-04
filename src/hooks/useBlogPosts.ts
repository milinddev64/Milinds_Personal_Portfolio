import { useState, useEffect } from 'react'
import { fetchPosts } from '@/lib/contentful'
import type { BlogPost } from '@/types'

export function useBlogPosts(category?: string) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchPosts(category)
      .then((data) => {
        if (!cancelled) {
          setPosts(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Failed to load blog posts.')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [category])

  return { posts, loading, error }
}
