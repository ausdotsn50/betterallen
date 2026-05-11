import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import popularCategories from '../../data/popularService.json';
import { ArrowRight } from 'lucide-react';
import { resolveLucideIcon } from '../../lib/utils';
import SearchBar from '../ui/SearchBar';
import { motion } from 'motion/react';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white py-12 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
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
                className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all hover:-translate-y-1 duration-200"
              >
                <ArrowRight
                  className="w-5 h-5 inline mr-2"
                  aria-hidden={true}
                />
                {t('hero.browse_services')}
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                {t('hero.contact_us')}
              </Link>
            </div>
          </div>
          {/* Right section with popular services and search */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-2xl"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
          >
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('hero.search_service')}
              </label>
              <SearchBar />
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
                    <Icon className="w-8 h-8 mb-2" aria-hidden={true} />
                    <Text className="text-center font-medium sm:text-base text-sm">
                      {t(category.labelKey)}
                    </Text>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
