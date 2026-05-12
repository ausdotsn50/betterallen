import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { motion } from 'motion/react';
import Section from '../ui/Section';

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};
import yaml from 'js-yaml';
import allenYaml from '../../data/about_allen.yaml?raw';
import betterGovYaml from '../../data/about_bettergov.yaml?raw';
import { Globe, MapPin } from 'lucide-react';

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
    <Section
      className="py-12 bg-gray-50"
      aria-label="About Allen and BetterGov"
    >
      <div className="max-w-352 mx-auto">
        <motion.div
          className="mb-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={listVariants}
        >
          <motion.div variants={itemVariants}>
            <Text className="mb-1 text-xs font-bold tracking-widest uppercase text-primary-500 max-w-none">
              Get to Know Us
            </Text>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading level={2} className="text-gray-900">
              About Allen &amp; BetterGov
            </Heading>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Text className="mt-2 text-gray-500 max-w-none">
              Learn about the municipality behind this website and the volunteer
              initiative that built it.
            </Text>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={listVariants}
        >
          {/* Allen Card */}
          <motion.div variants={itemVariants} className="h-full">
            <Card className="h-full bg-white border-gray-200 hover:border-primary-200 hover:-translate-y-2 transition-all duration-200">
              <CardContent className="flex flex-col justify-between h-full p-8">
                <div>
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 mb-5 rounded-xl bg-primary-600"
                    aria-hidden="true"
                  >
                    <MapPin className="text-white w-5 h-5" aria-hidden={true} />
                  </div>
                  <Heading level={4} className="mb-2 text-gray-900">
                    {allen.name}, {allen.province}
                  </Heading>
                  <Text className="text-sm leading-relaxed text-gray-500 max-w-none">
                    {allen.card_description}
                  </Text>
                </div>
                <Link
                  to="/about/allen"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-semibold transition-colors text-primary-600 hover:text-primary-500"
                  aria-label="Learn more about Allen"
                >
                  Learn about Allen →
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* BetterGov Card */}
          <motion.div variants={itemVariants} className="h-full">
            <Card className="h-full bg-primary-600 hover:bg-primary-500 hover:-translate-y-2 transition-all duration-200">
              <CardContent className="flex flex-col justify-between h-full p-8">
                <div>
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 mb-5 rounded-xl bg-white/20"
                    aria-hidden="true"
                  >
                    <Globe className="w-5 h-5 text-white" aria-hidden={true} />
                  </div>
                  <Heading level={4} className="mb-2 text-white">
                    {bettergov.name}
                  </Heading>
                  <Text className="text-sm leading-relaxed text-primary-100 max-w-none">
                    {bettergov.card_description}
                  </Text>
                </div>
                <Link
                  to="/about/bettergov"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white transition-colors hover:text-primary-100"
                  aria-label="Learn more about BetterGov"
                >
                  Learn about BetterGov →
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutSection;
