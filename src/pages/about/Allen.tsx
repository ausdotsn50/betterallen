import SEO from '../../components/SEO';
import Section from '../../components/ui/Section';
import { Heading } from '../../components/ui/Heading';
import { Text } from '../../components/ui/Text';
import { resolveLucideIcon } from '../../lib/utils';
import { aboutAllenData } from '../../data/yamlLoader';
import PageBanner from '@/components/ui/PageBanner';
import { MapPin } from 'lucide-react';

const data = aboutAllenData;

const AboutAllen: React.FC = () => {
  return (
    <>
      <SEO
        title={`About ${data.name}`}
        description={data.description}
        keywords={`${data.name}, ${data.province}, municipality, history, Philippines`}
      />

      <PageBanner
        title={`${data.name}, ${data.province}`}
        description={data.description}
        hideSearch={true}
        titleSize="6xl"
      />

      <Section className="mb-12 sm:px-10 lg:px-20 xl:px-30">
        {/* Key Statistics */}
        <div className="mb-5">
          <div
            className="grid grid-cols-2 gap-4 p-2 sm:flex sm:flex-row sm:justify-center"
            role="region"
            aria-label="Key statistics about Allen"
          >
            {data.stats.map(stat => {
              const Icon = resolveLucideIcon(stat.icon);
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-white border shadow-sm rounded-xl sm:gap-0 sm:w-44 sm:h-44 lg:w-56 lg:h-48"
                  role="group"
                  aria-label={`${stat.label}: ${stat.value}`}
                >
                  <div
                    className="inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-lg bg-primary-50 sm:mb-4"
                    aria-hidden="true"
                  >
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-center">
                    <Text
                      className={`font-bold text-blue-900 max-w-none ${
                        stat.value.length > 6 ? 'text-sm' : 'text-xl'
                      }`}
                    >
                      {stat.value}
                    </Text>
                    <Text className="mt-0.5 text-sm font-medium text-gray-600 max-w-none">
                      {stat.label}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* History */}
        <div className="mb-12">
          <Heading level={2}>History</Heading>
          <Text className="mt-2 mb-8 text-gray-600 max-w-none">
            {data.history}
          </Text>

          <div
            className="relative pl-8 space-y-6 border-l-2 border-primary-200"
            role="list"
            aria-label="Historical timeline"
          >
            {data.timeline.map(entry => (
              <div key={entry.year} className="relative" role="listitem">
                <div
                  className="absolute -left-[2.35rem] top-1.5 w-4 h-4 rounded-full bg-primary-500 border-4 border-white ring-2 ring-primary-300"
                  aria-hidden="true"
                />
                <div className="p-4 transition-all duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:border-primary-400 hover:shadow-md">
                  <Text className="mb-1 text-sm font-bold text-primary-600 max-w-none">
                    {entry.year}
                  </Text>
                  <Text className="text-sm text-gray-700 max-w-none">
                    {entry.event}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geography */}
        <div className="mb-12">
          <Heading level={2}>Geography</Heading>

          <div className="mt-6">
            {/* Unified Container */}
            <div className="overflow-hidden border bg-primary-50 border-primary-100 rounded-xl">
              <div className="flex flex-col lg:flex-row">
                {/* Description Side */}
                <div className="p-8 lg:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600"
                      aria-hidden="true"
                    >
                      <MapPin
                        className="w-5 h-5 text-white"
                        aria-hidden={true}
                      />
                    </div>
                    <Text className="text-sm font-bold tracking-wide uppercase text-primary-700">
                      Northern Samar, Eastern Visayas
                    </Text>
                  </div>
                  <Text className="leading-relaxed text-gray-700 max-w-none">
                    {data.geography}
                  </Text>
                </div>

                {/* Integrated Map Side */}
                <div className="relative flex items-stretch p-4 lg:p-6 lg:w-1/2">
                  <div className="relative w-full overflow-hidden bg-white border shadow-inner rounded-xl border-primary-200/50">
                    <iframe
                      title="Map showing location of Allen, Northern Samar in the Philippines"
                      src="https://maps.google.com/maps?q=12.5,124.282&z=14&output=embed"
                      className="w-full h-80 lg:h-full min-h-75"
                      loading="lazy"
                      aria-label="Geographic map of Allen, Northern Samar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AboutAllen;
