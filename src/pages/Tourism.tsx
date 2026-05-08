import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  tourismCategories,
  getFeaturedPlaces,
  getTourismPlaces,
  isTourismCategory,
} from '../data/tourismLoader';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';
import { resolveLucideIcon } from '../lib/utils';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FiFacebook } from 'react-icons/fi';

const heroImages = getFeaturedPlaces().map(p => p.image);

const Tourism: React.FC = () => {
  const { category } = useParams();
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length < 2) return;
    const id = setInterval(
      () => setHeroIndex(i => (i + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(id);
  }, []);
  if (!category) {
    return (
      <>
        <SEO
          title="Tourism"
          description={`Discover the best tourist spots, accommodations, and attractions in ${import.meta.env.VITE_GOVERNMENT_NAME}. Beaches, resorts, cafes, hotels, and more.`}
          keywords="tourism, travel, beaches, resorts, hotels, dining, attractions, tourist spots"
        />
        <section
          className="relative overflow-hidden text-white py-16"
          aria-label="Tourism hero"
        >
          {heroImages.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === heroIndex ? 1 : 0,
              }}
              aria-hidden="true"
            />
          ))}
          <div
            className="absolute inset-0 bg-primary-900/65"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-384 mx-auto sm:px-6 px-4">
            <Heading
              level={5}
              className="text-primary-200 inline-flex items-center gap-2 uppercase tracking-wide font-medium -mb-6"
            >
              <MapPin aria-hidden="true" />
              Allen, Northern Samar
            </Heading>
            <Heading className="tracking-wide mb-6">Tourism</Heading>
            <Heading level={3} className="text-primary-100 -mt-4">
              "The Gateway of Eastern Visayas"
            </Heading>
            <Text className="text-primary-100 md:text-xl text-base max-w-xl mb-6">
              Discover the Gateway to the Samar Island, where stunning coastal
              rock formations and beaches meet the warm hospitality of a vibrant
              port town.
            </Text>

            <div className="mb-6 flex gap-4">
              <div className="px-4 py-1 font-bold bg-primary-600 border-primary-100/20 w-fit border rounded-4xl text-sm">
                Allen yun
              </div>
              <div className="px-4 py-1 font-bold bg-primary-600 border-primary-100/20 w-fit border rounded-4xl text-sm">
                Tara sa Norte!
              </div>
            </div>

            <Button
              asChild
              variant="link"
              className="bg-white text-primary-700 text-base sm:text-lg px-6 py-6 font-semibold cursor-pointer"
            >
              <a
                href="https://www.facebook.com/allensamartourism/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Allen Tourism on Facebook"
              >
                <FiFacebook aria-hidden="true" />
                Follow @allensamartourism
              </a>
            </Button>
          </div>
        </section>

        <Section className="p-3 my-12">
          <Heading level={2}>Browse by Category</Heading>
          <Text className="text-gray-600 mb-6">
            Discover the best places to visit, stay, and dine in{' '}
            {import.meta.env.VITE_GOVERNMENT_NAME}.
          </Text>

          {tourismCategories.categories.length === 0 ? (
            <Text className="text-gray-500 text-center py-8">
              No tourism categories available at the moment.
            </Text>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tourismCategories.categories.map(cat => {
                const CatIcon = resolveLucideIcon(cat.icon);
                return (
                  <Link
                    key={cat.slug}
                    to={`/tourism/${cat.slug}`}
                    aria-label={`Browse ${cat.category} tourism places`}
                  >
                    <Card
                      hoverable
                      className={`h-full border-t-4 ${cat.color.border}`}
                    >
                      <CardContent>
                        <div
                          className={`${cat.color.bg} ${cat.color.text} p-3 rounded-md mb-4 w-fit`}
                          aria-hidden="true"
                        >
                          <CatIcon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <Heading
                          level={5}
                          className="font-semibold text-gray-900 mb-2"
                        >
                          {cat.category}
                        </Heading>
                        <Text className="text-sm text-gray-600">
                          {cat.description}
                        </Text>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </Section>
      </>
    );
  }

  const categoryData = tourismCategories.categories.find(
    c => c.slug === category
  );

  if (!categoryData || !isTourismCategory(category)) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tourism', href: '/tourism' },
            { label: category },
          ]}
          className="mb-8"
        />
        <Banner
          type="error"
          title="Category not found"
          description="The tourism category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  const places = getTourismPlaces(category);
  const CatIcon = resolveLucideIcon(categoryData.icon);

  return (
    <>
      <SEO
        title={categoryData.category}
        description={categoryData.description}
        keywords={`${categoryData.category}, tourism, travel, ${import.meta.env.VITE_GOVERNMENT_NAME}`}
      />
      <Section
        className="p-3 mb-12"
        aria-label={`${categoryData.category} places`}
      >
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tourism', href: '/tourism' },
            { label: categoryData.category },
          ]}
          className="mb-8"
        />
        <div
          className={`${categoryData.color.bg} ${categoryData.color.text} p-3 rounded-md mb-4 w-fit`}
          aria-hidden="true"
        >
          <CatIcon className="h-6 w-6" aria-hidden="true" />
        </div>
        <Heading>{categoryData.category}</Heading>
        <Text className="text-gray-600 mb-6">{categoryData.description}</Text>

        {places.length === 0 ? (
          <Text className="text-gray-500 text-center py-8">
            No places available in this category at the moment.
          </Text>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {places.map(place => (
              <Card
                key={place.slug}
                hoverable
                className={`h-full border-t-4 ${categoryData.color.border}`}
              >
                <CardContent>
                  {place.image && (
                    <div
                      className="h-40 bg-cover bg-center rounded-md mb-4"
                      style={{ backgroundImage: `url(${place.image})` }}
                      aria-hidden="true"
                    />
                  )}
                  <Heading
                    level={5}
                    className="font-semibold text-gray-900 mb-2"
                  >
                    {place.name}
                  </Heading>
                  <Text className="text-sm text-gray-600 mb-2">
                    {place.description}
                  </Text>
                  {place.barangay && (
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                      {place.barangay}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
};

export default Tourism;
