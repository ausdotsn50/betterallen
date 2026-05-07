import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  serviceCategories,
  getCategorySubcategories,
  type Subcategory,
} from '../data/yamlLoader';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { resolveLucideIcon } from '../lib/utils';
import PageBanner from '@/components/ui/PageBanner';

const Services: React.FC = () => {
  const { category } = useParams();

  const getCategory = () => {
    return serviceCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = resolveLucideIcon(categoryData?.icon);

  const categoryIndex = getCategorySubcategories(category || '');
  const subcategories: Subcategory[] = categoryIndex.pages;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
  ];
  if (!category) {
    return (
      <>
        <SEO
          title="Services"
          description={`All services provided by the LGU of ${import.meta.env.VITE_GOVERNMENT_NAME}. Find what you need for citizenship, business, education, and more.`}
          keywords="government services, public services, local government, civic services"
        />

        <PageBanner
          breadcrumbs={breadcrumbs}
          title="Local Government Services"
          description="Explore official municipal services from the Citizens Charter."
        />

        <ServicesSection
          title={`All local government services`}
          description={`All services provided by the LGU of ${import.meta.env.VITE_GOVERNMENT_NAME}. Find what you need for citizenship, business, education, and more.`}
          preview={false}
        />
      </>
    );
  }
  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={categoryData.category || category}
        description={categoryData.description}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section
        className="p-3 mb-12"
        aria-label={`${categoryData.category || category} services`}
      >
        <Breadcrumbs className="mb-8" />
        <Icon
          className="h-8 w-8 mb-4 text-primary-600 rounded-md"
          aria-hidden="true"
        />
        <Heading>{categoryData.category || category}</Heading>
        <Text className="text-gray-600 mb-6">{categoryData.description}</Text>

        {categoryIndex.title && (
          <Heading level={3}>{categoryIndex.title}</Heading>
        )}
        {categoryIndex.description && (
          <Text className="text-gray-600 mb-4">
            {categoryIndex.description}
          </Text>
        )}
        {categoryIndex.layout === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subcategories.map(subcategory => (
              <Link
                key={subcategory.slug}
                to={`/services/${category}/${subcategory.slug}`}
                aria-label={`${subcategory.name} - ${categoryData.category || category}`}
              >
                <Card
                  hoverable
                  className="h-full border-t-4 border-primary-500"
                >
                  <CardContent>
                    <Heading
                      level={5}
                      className="text-lg font-medium text-gray-900"
                    >
                      {subcategory.name}
                    </Heading>
                    {subcategory.description && (
                      <Text className="mt-2 text-sm text-gray-600">
                        {subcategory.description}
                      </Text>
                    )}
                    <span
                      className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800"
                      aria-label={`Category: ${categoryData.category || category}`}
                    >
                      {categoryData.category || category}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {subcategories.map(subcategory => (
              <Link
                key={subcategory.slug}
                to={`/services/${category}/${subcategory.slug}`}
                aria-label={`${subcategory.name} - ${categoryData.category || category}`}
              >
                <Card hoverable className="mb-4">
                  <CardContent>
                    <Heading
                      level={5}
                      className="text-lg font-medium text-gray-900"
                    >
                      {subcategory.name}
                    </Heading>
                    {subcategory.description && (
                      <Text size="sm" className="mt-2 text-gray-600">
                        {subcategory.description}
                      </Text>
                    )}
                    <span
                      className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800"
                      aria-label={`Category: ${categoryData.category || category}`}
                    >
                      {categoryData.category || category}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
};

export default Services;
