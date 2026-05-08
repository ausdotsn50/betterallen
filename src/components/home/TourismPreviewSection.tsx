import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Link } from 'react-router-dom';
import { tourismCategories, getPreviewPlaces } from '../../data/tourismLoader';
import type { Place } from '../../data/tourismLoader';
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
import { motion } from 'motion/react';

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const PREVIEW_COUNT = 3;

type PreviewPlace = Place & {
  category: string;
  categorySlug: string;
  categoryColor: string;
};

export default function TourismPreviewSection() {
  const previewedPlaces = getPreviewPlaces()
    .slice(0, PREVIEW_COUNT)
    .map(place => ({
      ...place,
      categoryColor: place.categoryColor ?? 'bg-primary-100 text-primary-700',
    })) as PreviewPlace[];

  if (previewedPlaces.length === 0) {
    return null;
  }

  return (
    <Section className="border-0.5 border-gray-100 bg-gray-50" maxWidth="full">
      <div className="max-w-352 mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
        >
          <Heading
            level={5}
            className="text-primary-600 font-bold text-md mb-2 flex items-center gap-1 uppercase tracking-wider"
          >
            <MapPin aria-hidden={true} />
            TOURISM
          </Heading>
          <Heading level={2}>Discover Allen</Heading>
          <Text className="text-gray-600 mb-6">
            Discover the best places to visit, stay, and dine in{' '}
            {import.meta.env.VITE_GOVERNMENT_NAME}.
          </Text>
        </motion.div>

        {tourismCategories.categories.length === 0 ? (
          <Text className="text-gray-500 text-center py-8">
            No tourism categories available at the moment.
          </Text>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <Carousel
              className="mx-12"
              aria-label="Tourism categories carousel"
              plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
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
                      <Link
                        aria-label={`View ${cat.category} tourism attractions`}
                        key={cat.slug}
                        to={`/tourism/${cat.slug}`}
                      >
                        <Card
                          hoverable
                          className={`h-full border-t-4 ${cat.color.border}`}
                        >
                          <CardContent>
                            <div
                              className={`${cat.color.bg} ${cat.color.text} p-3 rounded-md mb-4 w-fit`}
                            >
                              <CatIcon className="h-6 w-6" aria-hidden={true} />
                            </div>
                            <Heading level={5} className="mb-2 text-gray-900">
                              {cat.category}
                            </Heading>
                            <Text className="text-sm text-gray-600">
                              {cat.description}
                            </Text>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious aria-label="Previous tourism category" />
              <CarouselNext aria-label="Next tourism category" />
            </Carousel>
          </motion.div>
        )}

        <Heading level={4} className="mb-6 mt-12">
          Popular Spots in Allen
        </Heading>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={listVariants}
        >
          {previewedPlaces.map(place => (
            <motion.div
              key={place.slug}
              variants={itemVariants}
              className="h-full"
            >
              <TourismCard
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
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            to="/tourism"
            aria-label="View all contact information"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-all font-medium group"
          >
            View All
            <span
              aria-hidden="true"
              className="ml-1 transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
