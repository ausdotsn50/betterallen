import SEO from '../../components/SEO';
import Section from '../../components/ui/Section';
import { Heading } from '../../components/ui/Heading';
import { Text } from '../../components/ui/Text';
import { resolveLucideIcon } from '../../lib/utils';
import { aboutBetterGovData } from '../../data/yamlLoader';
import PageBanner from '@/components/ui/PageBanner';
import { Earth, Github, Mail, Star } from 'lucide-react';

const data = aboutBetterGovData;
const AboutBetterGov: React.FC = () => {
  return (
    <>
      <SEO
        title={`About ${data.name}`}
        description={data.description}
        keywords="BetterGov, BetterLGU, local government, civic technology, Philippines"
      />{' '}
      <PageBanner
        title={data.name}
        description={data.description}
        hideSearch={true}
        titleSize="6xl"
      />
      <Section className="mb-12 sm:px-10 lg:px-20 xl:px-30">
        {/* Mission — primary blue */}
        <div className="mb-12">
          <Heading level={3}>Our Mission</Heading>
          <div
            className="mt-6 overflow-hidden border bg-primary-50 border-primary-100 rounded-xl"
            role="region"
            aria-labelledby="mission-label"
          >
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600"
                  aria-hidden="true"
                >
                  <Star className="w-5 h-5 text-white" aria-hidden={true} />
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
          <Heading level={3}>Why It Was Created</Heading>
          <div
            className="mt-6 overflow-hidden border bg-primary-50 border-primary-100 rounded-xl"
            role="region"
            aria-labelledby="purpose-label"
          >
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600"
                  aria-hidden="true"
                >
                  <Earth className="w-5 h-5 text-white" aria-hidden={true} />
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
          <Heading level={3}>Who It&apos;s For</Heading>
          <div
            className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2"
            role="list"
            aria-label="Target audiences for BetterGov"
          >
            {data.benefits.map(benefit => {
              const Icon = resolveLucideIcon(benefit.icon);
              return (
                <div
                  key={benefit.audience}
                  className="flex flex-col p-6 border shadow-sm rounded-xl bg-primary-50 border-primary-100"
                  role="listitem"
                  aria-label={`${benefit.audience}: ${benefit.description}`}
                >
                  <div
                    className="inline-flex items-center justify-center shrink-0 w-10 h-10 mb-4 rounded-lg bg-primary-600"
                    aria-hidden="true"
                  >
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
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
          <Heading level={3}>Get Involved</Heading>
          <Text className="mt-2 mb-8 leading-relaxed text-gray-600 max-w-none">
            BetterGov is open to anyone who believes Filipinos deserve better
            from their government&apos;s digital services.
          </Text>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:volunteers@bettergov.ph"
              className="flex flex-row items-center gap-5 p-6 text-white transition-colors bg-primary-600 rounded-2xl hover:bg-primary-500"
              aria-label="Email Us at volunteers@bettergov.ph to contribute to BetterGov"
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 shrink-0"
                aria-hidden="true"
              >
                <Mail className="w-5 h-5 text-white" aria-hidden={true} />
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
              href="https://github.com/bettergovph/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-5 p-6 transition-all bg-white border border-primary-200 rounded-2xl hover:border-primary-400 hover:shadow-md"
              aria-label="Open an issue on GitHub to contribute ideas and suggestions to BetterGov (opens in new tab)"
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 shrink-0"
                aria-hidden="true"
              >
                <Github
                  className="w-6 h-6 text-primary-700"
                  aria-hidden={true}
                />
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
