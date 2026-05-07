import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router-dom';
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
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

import { serviceCategories } from '../../data/yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

export default function ServicesSection({
  title,
  description,
  preview,
}: {
  title?: string;
  description?: string;
  preview?: boolean;
}) {
  const { t } = useTranslation();

  const getIcon = (category: string) => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const allCategories = serviceCategories.categories as Category[];
  const mid = Math.floor(allCategories.length / 2);
  const leftCat = allCategories.slice(0, mid);
  const rightCat = allCategories.slice(mid);

  return (
    <Section>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' as const }}
      >
        <div className="flex items-center">
          <Heading level={2}>{title || t('services.title')}</Heading>
          {preview && (
            <div className="ml-auto">
              <Link
                to="/services"
                aria-label="View all services"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group"
              >
                View All{' '}
                <span
                  aria-hidden="true"
                  className="ml-1 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          )}
        </div>

        <Text className="text-gray-600 mb-6">
          {description || t('services.description')}
        </Text>
      </motion.div>

      {!preview && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={listVariants}
        >
          {allCategories.map(category => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Card hoverable className="border-t-4 border-primary-500">
                <Link
                  to={`/services/${category.slug}`}
                  aria-label={`View ${t(`services.${category.slug}.category`, { defaultValue: category.category })}`}
                  className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
                >
                  <CardContent className="flex flex-col h-full p-6">
                    <div className="flex gap-2">
                      <div
                        className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start"
                        aria-hidden="true"
                      >
                        {getIcon(category.icon)}
                      </div>

                      <Heading
                        level={5}
                        className="text-lg font-semibold mb-4 text-gray-900 self-center"
                      >
                        {t(`services.${category.slug}.category`, {
                          defaultValue: category.category,
                        })}
                      </Heading>
                    </div>
                    <Text className="text-gray-800">
                      {category.description}
                    </Text>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {preview && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <Carousel
            className="mb-6 mx-2"
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {leftCat.map(category => (
                <CarouselItem
                  key={category.slug}
                  className="md:basis-1/3 basis:1/2 lg:basis-1/4 py-2"
                >
                  <Card
                    hoverable
                    className="border-t-4 border-primary-500 h-60"
                  >
                    <Link
                      to={`/services/${category.slug}`}
                      className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
                    >
                      <CardContent className="flex flex-col h-full p-6">
                        <div className="flex gap-2">
                          <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start">
                            {getIcon(category.icon)}
                          </div>

                          <h3 className="text-lg font-semibold mb-4 text-gray-900 self-center">
                            {t(`services.${category.slug}.category`, {
                              defaultValue: category.category,
                            })}
                          </h3>
                        </div>
                        <Text className="text-gray-800">
                          {category.description}
                        </Text>
                      </CardContent>
                    </Link>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="xl:ml-0 ml-8 " />
            <CarouselNext className="xl:mr-0 mr-8 " />
          </Carousel>

          <Carousel
            className="mx-2"
            plugins={[Autoplay({ delay: 5500, stopOnInteraction: true })]}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {rightCat.map(category => (
                <CarouselItem
                  key={category.slug}
                  className="md:basis-1/3 basis:1/2 lg:basis-1/4 py-2"
                >
                  <Card
                    hoverable
                    className="border-t-4 border-primary-500 h-60"
                  >
                    <Link
                      to={`/services/${category.slug}`}
                      className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
                    >
                      <CardContent className="flex flex-col h-full p-6">
                        <div className="flex gap-2">
                          <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start">
                            {getIcon(category.icon)}
                          </div>

                          <h3 className="text-lg font-semibold mb-4 text-gray-900 self-center">
                            {t(`services.${category.slug}.category`, {
                              defaultValue: category.category,
                            })}
                          </h3>
                        </div>
                        <Text className="text-gray-800">
                          {category.description}
                        </Text>
                      </CardContent>
                    </Link>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="xl:ml-0 ml-8" />
            <CarouselNext className="xl:mr-0 mr-8 " />
          </Carousel>
        </motion.div>
      )}
    </Section>
  );
}
