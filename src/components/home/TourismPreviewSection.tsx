import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Link } from 'react-router-dom';
import { tourismCategories, getTourismPlaces } from '../../data/tourismLoader';
import type { Place } from '../../data/tourismLoader';
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import TourismCard from '../ui/TourismCard';
import { resolveLucideIcon } from '@/lib/utils';
import { Card, CardContent } from '@bettergov/kapwa/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const PREVIEW_COUNT = 3;

type PreviewPlace = Place & {
  category: string;
  categorySlug: string;
  categoryColor: string;
};

export default function TourismPreviewSection() {
  const [featuredPlaces, setFeaturedPlaces] = useState<PreviewPlace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedPlaces() {
      setLoading(true);
      try {
        const allPlaces: PreviewPlace[] = [];
        for (const cat of tourismCategories.categories) {
          const places = await getTourismPlaces(cat.slug);
          allPlaces.push(
            ...places.map(place => ({
              ...place,
              category: place.category ?? cat.category,
              categorySlug: cat.slug,
              categoryColor:
                place.categoryColor ?? 'bg-primary-100 text-primary-700',
            }))
          );
        }

        const featured = allPlaces.filter(p => p.featured);
        if (featured.length > 0) {
          setFeaturedPlaces(featured.slice(0, PREVIEW_COUNT));
        } else {
          setFeaturedPlaces(allPlaces.slice(0, PREVIEW_COUNT));
        }
      } catch (error) {
        console.error('Failed to load tourism places:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedPlaces();
  }, []);

  if (loading) {
    return (
      <Section>
        <Heading level={2}>Popular Tourist Spots</Heading>
        <Text className="text-gray-600 mb-6">Loading popular spots...</Text>
      </Section>
    );
  }

  if (featuredPlaces.length === 0) {
    return null;
  }

  return (
    <Section className="border-0.5 border-gray-100 bg-gray-50" maxWidth="full">
      <Heading
        level={5}
        className="text-primary-600 font-bold text-md mb-2 flex items-center gap-1 uppercase tracking-wider"
      >
        <MapPin />
        TOURISM
      </Heading>
      <Heading level={2}>Discover Allen</Heading>
      <Text className="text-gray-600 mb-6">
        Discover the best places to visit, stay, and dine in{' '}
        {import.meta.env.VITE_GOVERNMENT_NAME}.
      </Text>

      {tourismCategories.categories.length === 0 ? (
        <Text className="text-gray-500 text-center py-8">
          No tourism categories available at the moment.
        </Text>
      ) : (
        <Carousel
          className="mx-12"
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
          opts={{ loop: true }}
        >
          <CarouselContent className="py-2">
            {tourismCategories.categories.map(cat => {
              const CatIcon = resolveLucideIcon(cat.icon);
              return (
                <CarouselItem
                  key={cat.slug}
                  className="md:basis-1/3 basis:1/2 lg:basis-1/4"
                >
                  <Link key={cat.slug} to={`/tourism/${cat.slug}`}>
                    <Card
                      hoverable
                      className={`h-full border-t-4 ${cat.color.border}`}
                    >
                      <CardContent>
                        <div
                          className={`${cat.color.bg} ${cat.color.text} p-3 rounded-md mb-4 w-fit`}
                        >
                          <CatIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {cat.category}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {cat.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      <Heading level={4} className="mb-6 mt-12">
        Popular Spots in Allen
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPlaces.map(place => (
          <TourismCard
            key={place.slug}
            name={place.name}
            description={place.description}
            slug={place.slug}
            barangay={place.barangay}
            category={place.category}
            categoryColor={place.categoryColor}
            image={place.image}
            mapsUrl={place.mapsUrl}
            contact={place.contact}
            socialUrl={place.socialUrl}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/tourism"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          View All →
        </Link>
      </div>
    </Section>
  );
}
