import { UsersIcon, Building2Icon, HomeIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

const branches = [
  {
    title: 'Elected Officials',
    description:
      'The elected leadership of the Executive and Legislative branches, responsible for policy implementation and law-making.',
    icon: UsersIcon,
    path: '/government/elected-officials',
    category: 'Leadership',
  },
  {
    title: 'Municipal Offices',
    description:
      'Municipal departments and agencies responsible for specific areas of governance.',
    icon: Building2Icon,
    path: '/government/municipal-offices',
    category: 'Administrative',
  },
  {
    title: 'Barangays',
    description:
      'Local government units within the municipality, led by elected officials who manage community-level services and programs.',
    icon: HomeIcon,
    path: '/government/barangays',
    category: 'Local Units',
  },
];

const GovernmentNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="hidden md:grid grid-cols-3 gap-4">
        {branches.map(branch => {
          const isActive = currentPath.startsWith(branch.path);
          const Icon = branch.icon;
          return (
            <Link
              key={branch.path}
              to={branch.path}
              aria-label={`View ${branch.title}`}
              className={classNames(
                'group relative flex min-h-40 flex-col justify-between rounded-2xl border-1 p-4 transition-all duration-300',
                isActive
                  ? 'border-primary-500 shadow-sm text-primary-900'
                  : 'hover:border-primary-200 border-gray-200 bg-white text-gray-900 shadow-sm hover:shadow-sm'
              )}
              state={{ scrollToContent: true }}
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={classNames(
                      'rounded-xl p-2.5 shadow-sm transition-colors',
                      isActive
                        ? 'bg-white/20 text-primary-900'
                        : 'bg-primary-50 text-primary-600 border-primary-500'
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={classNames(
                      'text-[10px] font-bold tracking-[0.2em] uppercase',
                      isActive ? 'text-primary-900' : 'text-gray-400'
                    )}
                  >
                    {branch.category}
                  </span>
                </div>
                <Heading
                  level={4}
                  className={classNames(
                    'text-xl leading-tight tracking-tight',
                    isActive ? 'text-primary-900' : 'text-gray-900'
                  )}
                >
                  {branch.title}
                </Heading>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Text
                  className={classNames(
                    'line-clamp-2 pr-6 text-xs leading-relaxed font-medium',
                    isActive ? 'text-primary-900' : 'text-gray-500'
                  )}
                >
                  {branch.description}
                </Text>
                <ChevronRight
                  className={classNames(
                    'h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1',
                    isActive ? 'text-primary-900' : 'text-gray-400'
                  )}
                  aria-hidden="true"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Mobile horizontal accordion (< md) ── */}
      {/*
        Layout: a flex row where the active tab expands (flex-1) and
        inactive tabs collapse to show only icon + rotated title.
        Horizontal transition is driven by flex-grow + CSS transition.
      */}
      <div className="flex md:hidden flex-row gap-2 h-44 overflow-hidden">
        {branches.map(branch => {
          const isActive = currentPath.startsWith(branch.path);
          const Icon = branch.icon;
          return (
            <Link
              key={branch.path}
              to={branch.path}
              state={{ scrollToContent: true }}
              aria-label={`View ${branch.title} - ${branch.description}`}
              aria-current={isActive ? 'page' : undefined}
              className={classNames(
                'group relative flex flex-col rounded-2xl border-2 p-3 overflow-hidden',
                // Horizontal expand/collapse via flex-grow
                'transition-[flex-grow,background-color,border-color,box-shadow] duration-400 ease-in-out',
                isActive
                  ? 'flex-1 bg-primary-100 border-primary-500 shadow-lg'
                  : 'flex-[0_0_2.75rem] border-gray-200 bg-white shadow-sm hover:border-primary-400 hover:bg-primary-50/60'
              )}
            >
              {/* ── Collapsed state: centered icon + vertical label ── */}
              <div
                className={classNames(
                  'absolute inset-0 flex flex-col items-center justify-right gap-2 pt-1',
                  'transition-opacity duration-300',
                  isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                )}
                aria-hidden="true"
              >
                <div className="rounded-xl bg-primary-50 p-2 text-primary-600">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className="text-[9px] font-bold tracking-widest uppercase text-gray-500 whitespace-nowrap select-none"
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {branch.title}
                </span>
              </div>

              {/* ── Expanded state: full card content ── */}
              <div
                className={classNames(
                  'flex flex-col justify-between h-full min-w-0',
                  'transition-opacity duration-300',
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
              >
                {/* Top row: icon + category badge */}
                <div className="flex items-center justify-between gap-1">
                  <div
                    className="rounded-xl bg-white/30 p-2 text-primary-900 shrink-0"
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-primary-700 whitespace-nowrap truncate">
                    {branch.category}
                  </span>
                </div>

                {/* Title */}
                <Heading
                  level={3}
                  className="mt-2 text-sm leading-tight font-extrabold tracking-tight text-primary-900 line-clamp-2"
                >
                  {branch.title}
                </Heading>

                {/* Description + chevron */}
                <div className="mt-auto flex items-end justify-between gap-1">
                  <Text className="text-[10px] leading-snug font-medium text-primary-800 line-clamp-3 pr-1">
                    {branch.description}
                  </Text>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-primary-700"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default GovernmentNav;
