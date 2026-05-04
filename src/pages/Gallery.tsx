import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { photos } from '@/data/portfolio'
import { FaExpand } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import MediaViewer from '@/components/MediaViewer'

const Gallery = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeMedia, setActiveMedia] = useState<{ src: string; title: string } | null>(null)

  const categories = useMemo(() => {
    const cats = new Set<string>()
    photos.forEach((p) => {
      if (p.category) cats.add(p.category)
    })
    return Array.from(cats)
  }, [])

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos
    return photos.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('gallery.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('all')}
            >
              {t('photos.allCategories')}
            </Button>
            {categories.map((cat) => {
              const catLabel = t(`data.photos.${photos.find((p) => p.category === cat)?.id}.category`)
              return (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {catLabel}
                </Button>
              )
            })}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => {
              const photoData = t(`data.photos.${photo.id}`, { returnObjects: true }) as {
                title: string
                description: string
                category: string
              }

              return (
                <Card
                  key={photo.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                  onClick={() => photo.image && setActiveMedia({ src: photo.image, title: photoData.title })}
                >
                  <div className="relative h-56 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                    {photo.image ? (
                      <>
                        <img
                          src={photo.image}
                          alt={photoData.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        {/* Expand hint on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 drop-shadow" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-2xl font-bold text-muted-foreground/20">
                          {photoData.title}
                        </p>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{photoData.title}</CardTitle>
                      {photoData.category && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium whitespace-nowrap">
                          {photoData.category}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{photoData.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">{t('gallery.noPhotos')}</p>
            </div>
          )}
        </div>
      </div>

      <MediaViewer
        isOpen={activeMedia !== null}
        onClose={() => setActiveMedia(null)}
        type="image"
        src={activeMedia?.src ?? ''}
        title={activeMedia?.title}
      />
    </main>
  )
}

export default Gallery
