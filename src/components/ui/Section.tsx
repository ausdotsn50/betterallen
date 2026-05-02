import { cn } from '../../lib/utils';
type SectionMaxWidth = 'none' | 'full' | '2xl' | '4xl' | '5xl' | '6xl' | '7xl';

const maxWidthClasses: Record<SectionMaxWidth, string> = {
  none: 'max-w-none',
  full: 'max-w-full',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

export default function Section({
  children,
  className,
  id,
  maxWidth = '7xl',
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  maxWidth?: SectionMaxWidth;
}) {
  return (
    <section className={cn('py-12 bg-white', className)} id={id}>
      <div className={cn(maxWidthClasses[maxWidth], 'mx-auto sm:px-6 px-4')}>
        {children}
      </div>
    </section>
  );
}
