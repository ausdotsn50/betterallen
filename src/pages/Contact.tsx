import SEO from '../components/SEO';
import PageBanner from '@/components/ui/PageBanner';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { resolveLucideIcon } from '../lib/utils';
import hotlinesData from '../data/hotlines.json';
import { FacebookIcon, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const lguName = import.meta.env.VITE_GOVERNMENT_NAME || 'Local Government';
  const dummyEmail = import.meta.env.VITE_CONTACT_EMAIL;
  const dummyContact = import.meta.env.VITE_CONTACT_PHONE;
  const fb = import.meta.env.VITE_FACEBOOK_URL;

  return (
    <>
      <SEO
        title={`Contact Us - ${lguName}`}
        description={`Contact information and emergency hotlines for ${lguName}`}
      />
      <PageBanner
        title="Contact Us"
        description="Get in touch with us and access emergency hotlines."
      />

      <main aria-label="Contact information and hotlines">
        <Section className="py-12" maxWidth="6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div
                    className="flex items-center justify-center sm:w-12 sm:h-12 w-8 h-8 rounded-full bg-primary-100 text-primary-600"
                    aria-hidden="true"
                  >
                    {(() => {
                      const MailIcon = resolveLucideIcon('Mail');
                      return (
                        <MailIcon
                          className="sm:w-6 sm:h-6 w-5 h-5"
                          aria-hidden="true"
                        />
                      );
                    })()}
                  </div>
                  <div>
                    <Heading
                      level={6}
                      className="text-lg font-medium text-gray-900"
                    >
                      Email Address
                    </Heading>
                    <a
                      href={`mailto:${dummyEmail}`}
                      aria-label={`Email us at ${dummyEmail}`}
                      className="text-gray-700 hover:text-primary-600 text-sm sm:text-base"
                    >
                      {dummyEmail}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div
                    className="flex items-center justify-center sm:w-12 sm:h-12 w-8 h-8 rounded-full bg-primary-100 text-primary-600"
                    aria-hidden="true"
                  >
                    {(() => {
                      const PhoneIcon = resolveLucideIcon('Phone');
                      return (
                        <PhoneIcon
                          className="sm:w-6 sm:h-6 w-5 h-5"
                          aria-hidden="true"
                        />
                      );
                    })()}
                  </div>
                  <div>
                    <Heading
                      level={6}
                      className="text-lg font-medium text-gray-900"
                    >
                      Contact Number
                    </Heading>
                    <a
                      href={`tel:${dummyContact}`}
                      aria-label={`Call us at ${dummyContact}`}
                      className="text-gray-700 hover:text-primary-600 text-sm sm:text-base"
                    >
                      {dummyContact}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div
                    className="flex items-center justify-center sm:w-12 sm:h-12 w-8 h-8 rounded-full bg-primary-100 text-primary-600"
                    aria-hidden="true"
                  >
                    <FacebookIcon
                      className="sm:w-6 sm:h-6 w-5 h-5"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <Heading
                      level={6}
                      className="text-lg font-medium text-gray-900"
                    >
                      Facebook Page
                    </Heading>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 h-auto text-primary-700"
                    >
                      <a
                        href={fb}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open the Facebook page for ${lguName} in a new tab`}
                      >
                        {fb}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <Card>
              <CardContent className="p-0!">
                <div className="w-full">
                  <div className="w-full bg-primary-600 text-white px-6 py-4 rounded-t-md">
                    <div className="flex items-center gap-3">
                      <Heading level={5} className="text-lg font-bold">
                        Office Hours
                      </Heading>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="p-6 flex items-start gap-4">
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600"
                        aria-hidden="true"
                      >
                        {(() => {
                          const Icon = resolveLucideIcon('Clock');
                          return (
                            <Icon className="w-6 h-6" aria-hidden="true" />
                          );
                        })()}
                      </div>
                      <div>
                        <Text className="text-sm font-medium text-gray-900">
                          Monday - Friday
                        </Text>
                        <Text className="text-sm text-gray-700">
                          8:00 AM - 5:00 PM
                        </Text>
                      </div>
                    </div>

                    <div className="p-6 flex items-start gap-4">
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600"
                        aria-hidden="true"
                      >
                        {(() => {
                          const Icon = resolveLucideIcon('Coffee');
                          return (
                            <Icon className="w-6 h-6" aria-hidden="true" />
                          );
                        })()}
                      </div>
                      <div>
                        <Text className="text-sm font-medium text-gray-900">
                          Lunch Break
                        </Text>
                        <Text className="text-sm text-gray-700">
                          12:00 NN - 1:00 PM
                        </Text>
                      </div>
                    </div>

                    <div className="p-6 flex items-start gap-4">
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600"
                        aria-hidden="true"
                      >
                        {(() => {
                          const Icon = resolveLucideIcon('Calendar');
                          return (
                            <Icon className="w-6 h-6" aria-hidden="true" />
                          );
                        })()}
                      </div>
                      <div>
                        <Text className="text-sm font-medium text-gray-900">
                          Closed
                        </Text>
                        <Text className="text-sm text-gray-700">
                          Weekends, National, and Local Holidays
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Emergency Hotlines
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hotlinesData.hotlines.map(hotline => {
              const Icon = resolveLucideIcon(hotline.icon);
              return (
                <Card key={hotline.slug} hoverable className="h-full">
                  <CardContent className="">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div
                        className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-50 text-red-600"
                        aria-hidden="true"
                      >
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <Heading
                        level={6}
                        className="mb-2 text-lg font-medium text-gray-900"
                      >
                        {hotline.name}
                      </Heading>
                      <a
                        href={`tel:${hotline.number}`}
                        aria-label={`Call ${hotline.name} at ${hotline.number}`}
                        className="font-mono text-lg font-bold text-red-600 hover:text-red-700"
                      >
                        {hotline.number}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Section>

        <Section className="pb-12" maxWidth="6xl">
          <div className="mb-6">
            <Heading level={4}>Report or Suggest Changes</Heading>
            <Text className="mt-2 max-w-none text-gray-600 leading-relaxed">
              If you notice any problems, incorrect details, suggestions, or new
              data to add to the website, please let me know using one of the
              options below.
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card hoverable className="h-full">
              <CardContent className="h-full">
                <a
                  href={`mailto:${import.meta.env.VITE_MAINTAINER_EMAIL}`}
                  aria-label={`Email us at ${import.meta.env.VITE_MAINTAINER_EMAIL} to report a problem or inaccuracy`}
                  className="flex h-full items-start gap-4 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-700"
                    aria-hidden="true"
                  >
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <Heading
                      level={6}
                      className="mb-2 text-lg font-semibold text-gray-900"
                    >
                      Email Me
                    </Heading>
                    <Text className="mb-2 max-w-none text-sm text-gray-600">
                      Send a message if you spot something that needs to be
                      corrected.
                    </Text>
                    <Text className="font-medium text-primary-700">
                      {import.meta.env.VITE_MAINTAINER_EMAIL}
                    </Text>
                  </div>
                </a>
              </CardContent>
            </Card>

            <Card hoverable className="h-full">
              <CardContent className="h-full">
                <a
                  href="https://github.com/xandreiAThome/betterallen"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the website repository on GitHub to report a problem or inaccuracy"
                  className="flex h-full items-start gap-4 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-800"
                    aria-hidden="true"
                  >
                    <Github className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <Heading
                      level={6}
                      className="mb-2 text-lg font-semibold text-gray-900"
                    >
                      Open a GitHub Issue
                    </Heading>
                    <Text className="mb-2 max-w-none text-sm text-gray-600">
                      Use the repository to report website issues or suggest a
                      change.
                    </Text>
                    <Text className="font-medium text-primary-700">
                      github.com/xandreiAThome/betterallen
                    </Text>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>
    </>
  );
};

export default Contact;
