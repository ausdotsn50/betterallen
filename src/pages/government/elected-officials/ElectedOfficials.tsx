import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  Briefcase,
  ArrowRight,
  UsersIcon,
  Landmark,
} from 'lucide-react';
import SEO from '../../../components/SEO';
import { Heading } from '../../../components/ui/Heading';
import { Text } from '../../../components/ui/Text';
import {
  executiveOfficials,
  legislativeOfficials,
  type ExecutiveOfficial,
  type LegislativeOfficial,
} from '../../../data/yamlLoader';
import ElectedLeaderCard from '../../../components/gov-components/ElectedLeaderCard';
import CouncilMemberCard from '../../../components/gov-components/CouncilMemberCard';

type CouncilMember = LegislativeOfficial;

export default function ElectedOfficials() {
  const executiveList = executiveOfficials as ExecutiveOfficial[];
  const legislativeList = legislativeOfficials as CouncilMember[];
  const electedLeaders = executiveList.filter(o => o.isElected !== false);

  return (
    <main className="p-4 md:p-6 space-y-10 md:space-y-12 max-w-7xl mx-auto">
      <SEO
        title="Elected Officials"
        description="Meet the elected officials of the municipality."
      />

      <section aria-label="Executive Branch">
        <div className="text-center">
          <Heading level={2}>Elected Officials</Heading>
          <Text size="sm" className="text-gray-600 mt-2 mx-auto">
            The elected leaders and legislative body of the Municipal
            Government.
          </Text>
        </div>

        {/* ── SECTION 1: EXECUTIVE BRANCH ── */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
          <Landmark
            className="h-4 w-4 text-primary-500 shrink-0"
            aria-hidden="true"
          />
          <Heading
            level={6}
            className="text-gray-500 text-xs! mb-0 font-bold tracking-widest uppercase"
          >
            Executive Branch
          </Heading>
        </div>
        {/*
          Mobile  → single column
          sm      → 2 columns (mayor + vice mayor side by side)
          lg      → keeps 2 columns (cards are wide enough to read)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {electedLeaders.map((leader, idx) => (
            <ElectedLeaderCard
              key={leader.slug || leader.name || idx}
              leader={leader}
            />
          ))}
        </div>
      </section>

      {/* ── SECTION 2: LEGISLATIVE BRANCH ── */}
      {legislativeList.length > 0 && (
        <section aria-label="Sangguniang Bayan - Legislative Branch">
          <div className="flex items-center gap-3 mb-5 border-yellow border-gray-100 pb-4">
            <UsersIcon
              className="h-4 w-4 text-primary-500 shrink-0"
              aria-hidden="true"
            />
            <Heading
              level={6}
              className="text-gray-500 text-xs! mb-0 font-bold tracking-widest uppercase"
            >
              Sangguniang Bayan
            </Heading>
          </div>

          {/*
            Mobile  → 1 columns (compact council cards fit at ~160 px each)
            md      → 2 columns
            xl      → 3 columns
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 items-stretch">
            {legislativeList.map((member, idx) => (
              <CouncilMemberCard key={member.name || idx} member={member} />
            ))}
          </div>

          {/* Committees CTA */}
          <div className="border border-gray-200 bg-gray-50 mt-6 md:mt-8 flex flex-col gap-4 rounded-xl p-4 md:p-5 sm:flex-row sm:items-center sm:justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <BookOpenIcon
                className="text-gray-400 h-5 w-5 md:h-6 md:w-6 shrink-0"
                aria-hidden="true"
              />
              <div>
                <Heading
                  level={5}
                  className="text-gray-900 text-sm mb-0 font-bold"
                >
                  Standing Committees
                </Heading>
                <Text className="text-gray-500 text-xs mt-0.5">
                  View full committee assignments and member listings
                </Text>
              </div>
            </div>
            <Link
              to="/government/elected-officials/committees"
              aria-label="View all standing committees"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 text-gray-700 px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-sm">
                View Committees{' '}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* ── SECTION 3: DEPARTMENTS BRIDGE ── */}
      <section aria-label="Municipal Offices Directory Link">
        <div className="border border-gray-200 bg-linear-to-br from-gray-50 to-white flex flex-col gap-4 rounded-2xl p-4 md:p-6 md:flex-row md:items-center md:justify-between shadow-sm">
          <div className="flex items-start gap-3 md:gap-4">
            <div
              className="bg-blue-50 text-primary-600 p-2.5 md:p-3 rounded-xl border border-primary-100 shrink-0"
              aria-hidden="true"
            >
              <Briefcase className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <Heading
                level={5}
                className="text-gray-900 mb-0 font-bold text-base md:text-lg"
              >
                Looking for Municipal Office Heads?
              </Heading>
              <Text className="text-gray-500 text-xs md:text-sm mt-1">
                Municipal Treasurer, Assessor, Engineer, and other service heads
                are listed in the directory.
              </Text>
            </div>
          </div>
          <Link
            to="/government/municipal-offices"
            aria-label="Go to Municipal Offices directory"
            className="w-full md:w-auto shrink-0"
          >
            <button className="w-full md:w-auto bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 text-gray-700 px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-sm">
              Go to Municipal Offices{' '}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
