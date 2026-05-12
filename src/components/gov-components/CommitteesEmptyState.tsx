import { BookOpenIcon } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export default function CommitteesEmptyState({
  searchTerm,
}: {
  searchTerm: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center px-4"
      aria-label="No committees found"
    >
      <div
        className="mb-4 rounded-full bg-gray-200 p-4 text-gray-500"
        aria-hidden="true"
      >
        <BookOpenIcon className="h-8 w-8" />
      </div>
      <Heading level={3} className="text-lg font-bold text-gray-900">
        No Committees Found
      </Heading>
      <Text className="mt-1 text-sm text-gray-500">
        We couldn't find any committees matching "{searchTerm}".
      </Text>
    </div>
  );
}
