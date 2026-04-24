import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import popularCategories from '../../data/popularService.json';
import { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { serviceCategories, loadCategoryIndex } from '../../data/yamlLoader';
import { useDebounce } from '../../hooks/useDebounce';
import { resolveLucideIcon } from '../../lib/utils';

interface SearchResult {
  title: string;
  slug: string;
  categorySlug: string;
  description?: string;
  type: string; // e.g., 'service', 'tourism', etc. - extensible for future types
  icon?: string; // For categories
}

export default function Hero() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 200);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, idx) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={idx} className="bg-yellow-200 font-semibold">
          {part}
        </mark>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  const formatTypeBadge = (type?: string) => {
    if (!type) return 'Service';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const search = async () => {
      const results: SearchResult[] = [];
      const query = debouncedSearchQuery.toLowerCase();

      // Search through categories
      for (const category of serviceCategories.categories || []) {
        if (category.category.toLowerCase().includes(query)) {
          results.push({
            title: category.category,
            slug: category.slug,
            categorySlug: category.slug,
            description: category.description,
            type: category.type || 'service',
            icon: category.icon,
          });
        }

        // Search through pages in each category
        try {
          const index = await loadCategoryIndex(category.slug);
          for (const page of index.pages || []) {
            if (
              page.name.toLowerCase().includes(query) ||
              (page.description?.toLowerCase().includes(query) ?? false)
            ) {
              results.push({
                title: page.name,
                slug: page.slug,
                categorySlug: category.slug,
                description: page.description,
                type: category.type || 'service',
              });
            }
          }
        } catch {
          console.warn(`Failed to search category ${category.slug}`);
        }
      }

      setSearchResults(results.slice(0, 8)); // Limit to 8 results
    };

    search();
  }, [debouncedSearchQuery]);
  return (
    <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left section with title and search */}
          <div className="animate-fade-in">
            <Text transform="uppercase" className="font-bold">
              Welcome to
            </Text>
            <Heading>{t('hero.title')}</Heading>
            <Text>{t('hero.subtitle')}</Text>
            <div className="flex gap-4 mt-8">
              <Link
                to="/services"
                className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowRight className="w-5 h-5 inline mr-2" />
                {t('hero.browse_services')}
              </Link>
              <a
                href="https://bettergov.ph/contact"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                {t('hero.contact_us')}
              </a>
            </div>
          </div>

          {/* Right section with popular services and search */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('hero.search_service')}
              </label>
              <div className="relative">
                <div className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder={
                      t('hero.search_placeholder') || 'Search services...'
                    }
                    className="text-black flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-primary-600 rounded-r-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>

                {/* Search results hover card */}
                {isInputFocused && debouncedSearchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((result, idx) =>
                        result.icon ? (
                          <Link
                            key={idx}
                            to={`/services/${result.slug}`}
                            onClick={() => {
                              setSearchQuery('');
                              setIsInputFocused(false);
                            }}
                            className="block p-3 hover:bg-primary-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <div className="flex gap-3 items-center">
                              <div className="bg-primary-100 text-primary-600 p-2 rounded-md shrink-0">
                                <Search className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900 text-sm">
                                    {highlightText(result.title, searchQuery)}
                                  </p>
                                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium shrink-0">
                                    {formatTypeBadge(result.type)}
                                  </span>
                                </div>
                                {result.description && (
                                  <p className="text-xs text-gray-600 line-clamp-1">
                                    {highlightText(
                                      result.description,
                                      searchQuery
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <Link
                            key={idx}
                            to={`/services/${result.categorySlug}/${result.slug}`}
                            onClick={() => {
                              setSearchQuery('');
                              setIsInputFocused(false);
                            }}
                            className="block px-4 py-3 hover:bg-primary-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-gray-900 text-sm">
                                {highlightText(result.title, searchQuery)}
                              </p>
                              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium shrink-0">
                                {formatTypeBadge(result.type)}
                              </span>
                            </div>
                            {result.description && (
                              <p className="text-xs text-gray-600 line-clamp-1">
                                {highlightText(result.description, searchQuery)}
                              </p>
                            )}
                          </Link>
                        )
                      )
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-gray-500 text-sm">
                          {t('hero.no_results') || 'No results found'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <Text className="text-gray-800 font-medium mb-4">
              {t('hero.popular_services')}
            </Text>
            <div className="grid grid-cols-3 gap-2">
              {popularCategories.popularCategories.map(category => {
                const Icon = resolveLucideIcon(category.icon);
                return (
                  <Link
                    to={`/services/${category.slug}`}
                    key={category.slug}
                    className={` flex flex-col items-center justify-center p-4 rounded-lg ${category.color} transition-transform hover:scale-105 cursor-pointer`}
                  >
                    <Icon className="w-8 h-8 mb-2" />
                    <Text className="text-center font-medium">
                      {t(category.labelKey)}
                    </Text>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
