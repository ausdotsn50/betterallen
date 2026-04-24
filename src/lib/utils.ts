import { clsx, type ClassValue } from 'clsx';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LucideIconName = keyof typeof LucideIcons;

export function resolveLucideIcon(name?: string): ComponentType<LucideProps> {
  const fallback = LucideIcons.CircleHelp;
  if (!name) return fallback;

  if (name in LucideIcons) {
    return LucideIcons[name as LucideIconName] as ComponentType<LucideProps>;
  }

  return fallback;
}
