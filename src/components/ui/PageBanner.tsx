import Breadcrumbs from './Breadcrumbs';
import { ReactNode } from 'react';
import { Heading } from './Heading';
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
  search?: ReactNode;
  titleSize?: '4xl' | '5xl' | '6xl';
}

const titleSizeClasses: Record<string, string> = {
  '4xl': 'text-3xl sm:text-4xl md:text-4xl lg:text-4xl',
  '5xl': 'text-4xl sm:text-5xl md:text-5xl lg:text-5xl',
  '6xl': 'text-5xl sm:text-6xl md:text-6xl lg:text-6xl',
};

const containerMaxWidthClasses: Record<string, string> = {
  '4xl': 'max-w-2xl',
  '5xl': 'max-w-3xl',
  '6xl': 'max-w-4xl',
};

const headingMaxWidthClasses: Record<string, string> = {
  '4xl': 'max-w-xl',
  '5xl': 'max-w-2xl',
  '6xl': 'max-w-3xl',
};

const descriptionMaxWidthClasses: Record<string, string> = {
  '4xl': 'max-w-lg',
  '5xl': 'max-w-xl',
  '6xl': 'max-w-2xl',
};

const PageBanner = ({
  breadcrumbs,
  title,
  description,
  className = '',
  search,
  titleSize = '4xl',
}: PageBannerProps) => {
  return (
    <div
      className={`bg-linear-to-r from-primary-600 to-primary-700 py-12 text-white md:py-14 ${className}`}
    >
      <div className="container mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <div
          className={`mx-auto w-full ${containerMaxWidthClasses[titleSize]}`}
        >
          <Breadcrumbs
            className="mb-4 justify-center text-white/90"
            items={breadcrumbs}
          />
          <Heading
            level={1}
            className={`mx-auto mb-2 ${headingMaxWidthClasses[titleSize]} font-semibold leading-tight tracking-tight ${titleSizeClasses[titleSize]}`}
          >
            {title}
          </Heading>
          <Text
            className={`mx-auto mt-2 ${descriptionMaxWidthClasses[titleSize]} text-sm leading-6 text-primary-100 sm:text-base`}
          >
            {description}
          </Text>
          {search && (
            <div className="mx-auto mt-7 w-full max-w-xl">{search}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
