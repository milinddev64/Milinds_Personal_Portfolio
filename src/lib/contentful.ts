import { createClient } from 'contentful'
import type { Entry, EntryFieldTypes } from 'contentful'
import type { BlogPost } from '@/types'

// Content type skeleton — follows the official TypeScript pattern (v10+)
// EntryFieldTypes map directly to Contentful field types in the web app
type MilindsBlogSkeleton = {
  contentTypeId: 'milindsBlog'
  fields: {
    title: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    excerpt: EntryFieldTypes.Text
    body: EntryFieldTypes.RichText
    // tags is stored as a single Symbol field (comma-separated string) in Contentful
    tags: EntryFieldTypes.Symbol
    category: EntryFieldTypes.Symbol
    publishedDate: EntryFieldTypes.Date
    readTime: EntryFieldTypes.Integer
    coverImage?: EntryFieldTypes.AssetLink
  }
}

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID as string,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string,
})

const CONTENT_TYPE: MilindsBlogSkeleton['contentTypeId'] = 'milindsBlog'

// Entry shape returned by withoutUnresolvableLinks: linked assets are resolved
// inline; unresolvable links are removed rather than kept as stub link objects
function mapEntry(entry: Entry<MilindsBlogSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>): BlogPost {
  const f = entry.fields
  // coverImage is an optional resolved Asset — access nested fields via `any`
  // because the Contentful Asset type's file.url is typed as string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cover = f.coverImage as any
  return {
    id: entry.sys.id,
    title: f.title,
    slug: f.slug,
    excerpt: f.excerpt ?? '',
    body: f.body,
    coverImage: cover?.fields?.file?.url
      ? { url: `https:${cover.fields.file.url}`, title: cover.fields.title ?? '' }
      : undefined,
    // tags is stored as "react, typescript, vite" — split into an array
    tags: typeof f.tags === 'string'
      ? f.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [],
    category: f.category ?? '',
    publishedDate: f.publishedDate ?? '',
    readTime: f.readTime,
  }
}

export async function fetchPosts(category?: string): Promise<BlogPost[]> {
  // order must be an array in contentful.js v10+ (breaking change from comma-string)
  const res = await client.withoutUnresolvableLinks.getEntries<MilindsBlogSkeleton>({
    content_type: CONTENT_TYPE,
    order: ['-fields.publishedDate'],
    ...(category && category !== 'all' ? { 'fields.category': category } : {}),
  })
  return res.items.map(mapEntry)
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await client.withoutUnresolvableLinks.getEntries<MilindsBlogSkeleton>({
    content_type: CONTENT_TYPE,
    'fields.slug': slug,
    limit: 1,
  })
  if (res.items.length === 0) return null
  return mapEntry(res.items[0])
}
