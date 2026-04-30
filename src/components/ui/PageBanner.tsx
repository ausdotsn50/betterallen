import Breadcrumbs from './Breadcrumbs';
import { Heading } from './Heading';
import SearchBar from './SearchBar';
import { Text } from './Text';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  description: string;
  className?: string;
}

const PageBanner = ({
  breadcrumbs,
  title,
  description,
  className = '',
}: PageBannerProps) => {
  return (
    <div
      className={`bg-linear-to-r from-primary-600 to-primary-700 py-12 text-white md:py-14 ${className}`}
    >
      <div className="container mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <Breadcrumbs
            className="mb-4 justify-center text-white/90"
            items={breadcrumbs}
          />
          <Heading
            level={1}
            className="mx-auto mb-2 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-4xl lg:text-4xl"
          >
            {title}
          </Heading>
          <Text className="mx-auto mt-2 max-w-lg text-sm leading-6 text-primary-100 sm:text-base">
            {description}
          </Text>
          <div className="mx-auto mt-7 w-full max-w-xl">
            <SearchBar
              variant="pill"
              placeholder="Search services (e.g., birth certificate, business permit)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
