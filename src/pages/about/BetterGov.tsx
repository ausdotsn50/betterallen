import SEO from '../../components/SEO';
import Section from '../../components/ui/Section';
import { Heading } from '../../components/ui/Heading';
import { Text } from '../../components/ui/Text';
import { resolveLucideIcon } from '../../lib/utils';
import { aboutBetterGovData } from '../../data/yamlLoader';
import PageBanner from '@/components/ui/PageBanner';

const data = aboutBetterGovData;

const AboutBetterGov: React.FC = () => {
  return (
    <>
      <SEO
        title={`About ${data.name}`}
        description={data.description}
        keywords="BetterGov, BetterLGU, local government, civic technology, Philippines"
      />

      <PageBanner
        title={data.name}
        description="Learn about the volunteer initiative making local government information accessible to every Filipino."
      />

      <Section className="mb-12 sm:px-10 lg:px-20 xl:px-30">
        {/* Mission — primary blue */}
        <div className="mb-12">
          <Heading level={2}>Our Mission</Heading>
          <div className="mt-6 overflow-hidden border bg-primary-50 border-primary-100 rounded-xl">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </div>
                <Text className="text-sm font-bold tracking-wide uppercase text-primary-700 max-w-none">
                  Core Objective
                </Text>
              </div>
              <Text className="leading-relaxed text-gray-700 max-w-none">
                {data.mission}
              </Text>
            </div>
          </div>
        </div>

        {/* Why It Was Created — back to primary */}
        <div className="mb-12">
          <Heading level={2}>Why It Was Created</Heading>
          <div className="mt-6 overflow-hidden border bg-primary-50 border-primary-100 rounded-xl">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253"
                    />
                  </svg>
                </div>
                <Text className="text-sm font-bold tracking-wide uppercase text-primary-700 max-w-none">
                  The Purpose
                </Text>
              </div>
              <Text className="leading-relaxed text-gray-700 max-w-none">
                {data.why}
              </Text>
            </div>
          </div>
        </div>

        {/* Who It's For — both cards primary */}
        <div className="mb-12">
          <Heading level={2}>Who It&apos;s For</Heading>
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
            {data.benefits.map(benefit => {
              const Icon = resolveLucideIcon(benefit.icon);
              return (
                <div
                  key={benefit.audience}
                  className="flex flex-col p-6 border shadow-sm rounded-xl bg-primary-50 border-primary-100"
                >
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 mb-4 rounded-lg bg-primary-600">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Text className="text-xl font-bold max-w-none text-primary-900">
                    {benefit.audience}
                  </Text>
                  <Text className="mt-2 text-sm text-gray-600 max-w-none">
                    {benefit.description}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>

        {/* Get Involved — email and GitHub cards */}
        <div className="mb-12">
          <Heading level={2}>Get Involved</Heading>
          <Text className="mt-2 mb-8 leading-relaxed text-gray-600 max-w-none">
            BetterGov is open to anyone who believes Filipinos deserve better
            from their government&apos;s digital services.
          </Text>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:volunteers@bettergov.ph"
              className="flex flex-row items-center gap-5 p-6 text-white transition-colors bg-primary-600 rounded-2xl hover:bg-primary-500"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                  />
                </svg>
              </div>
              <div className="text-left">
                <Text className="font-semibold text-white max-w-none">
                  Email Us
                </Text>
                <Text className="text-xs text-primary-100 max-w-none">
                  Introduce yourself and tell us how you want to contribute to
                  the project.
                </Text>
              </div>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-5 p-6 transition-all bg-white border border-primary-200 rounded-2xl hover:border-primary-400 hover:shadow-md"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 shrink-0">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div className="text-left">
                <Text className="font-semibold text-primary-800 max-w-none">
                  Open an Issue
                </Text>
                <Text className="text-xs text-gray-500 max-w-none">
                  Have an idea or suggestion? Start the conversation on GitHub
                  and help shape the project.
                </Text>
              </div>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AboutBetterGov;
