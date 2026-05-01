import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import yaml from 'js-yaml';
import allenYaml from '../../data/about_allen.yaml?raw';
import betterGovYaml from '../../data/about_bettergov.yaml?raw';

interface AllenData {
  name: string;
  province: string;
  description: string;
  card_description: string;
}

interface BetterGovData {
  name: string;
  description: string;
  card_description: string;
}

const allen = yaml.load(allenYaml) as AllenData;
const bettergov = yaml.load(betterGovYaml) as BetterGovData;

const AboutSection: React.FC = () => {
  return (
    <section className="px-4 py-12 bg-gray-50 sm:px-10 lg:px-20 xl:px-30">
      <div className="mb-8">
        <Text className="mb-1 text-xs font-bold tracking-widest uppercase text-primary-500 max-w-none">
          Get to Know Us
        </Text>
        <Heading level={2} className="text-gray-900">
          About Allen &amp; BetterGov
        </Heading>
        <Text className="mt-2 text-gray-500 max-w-none">
          Learn about the municipality behind this website and the volunteer
          initiative that built it.
        </Text>
      </div>

      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-6">
        {/* Allen Card */}
        <div className="flex flex-col justify-between p-8 transition-all duration-200 bg-white border border-gray-200 shadow-sm rounded-2xl hover:border-primary-300 hover:shadow-md">
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 mb-5 rounded-xl bg-primary-600">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <Heading level={3} className="mb-2 text-gray-900">
              {allen.name}, {allen.province}
            </Heading>
            <Text className="text-sm leading-relaxed text-gray-500 max-w-none">
              {allen.card_description}
            </Text>
          </div>
          <Link
            to="/about/allen"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold transition-colors text-primary-600 hover:text-primary-500"
          >
            Learn about Allen
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

        {/* BetterGov Card */}
        <div className="flex flex-col justify-between p-8 transition-all duration-200 border shadow-sm bg-primary-600 border-primary-700 rounded-2xl hover:bg-primary-500">
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 mb-5 rounded-xl bg-white/20">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253"
                />
              </svg>
            </div>
            <Heading level={3} className="mb-2 text-white">
              {bettergov.name}
            </Heading>
            <Text className="text-sm leading-relaxed text-primary-100 max-w-none">
              {bettergov.card_description}
            </Text>
          </div>
          <Link
            to="/about/bettergov"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white transition-colors hover:text-primary-100"
          >
            Learn about BetterGov
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
