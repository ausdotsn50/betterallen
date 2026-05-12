import { Card, CardContent } from '@bettergov/kapwa/card';
import { MapPin } from 'lucide-react';
import type { Place } from '../../data/tourismLoader';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

type TourismCardProps = Omit<Place, 'featured'>;
export default function TourismCard({
  name,
  description,
  slug,
  barangay,
  category,
  categoryColor,
  image,
  mapsUrl,
  contact,
  socialUrl,
}: TourismCardProps) {
  return (
    <Card
      key={slug}
      role="article"
      className="h-full drop-shadow-sm hover:border-primary-200 transition-all hover:-translate-y-2 duration-200"
    >
      <CardContent className="p-0!">
        {image && (
          <img
            src={image}
            alt={`${name} - Tourist attraction in ${barangay}, Allen`}
            className="w-full h-48 object-cover rounded-t-md"
          />
        )}
        <div className="p-6">
          <Heading
            level={5}
            className="text-lg font-semibold text-gray-900 mb-2"
          >
            {name}
          </Heading>
          <Text size="sm" className="text-gray-600 mb-2">
            {description}
          </Text>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-sm mb-2 mr-2 ${categoryColor ?? 'bg-primary-100 text-primary-700'}`}
            role="badge"
          >
            {category}
          </span>
          <span
            className="inline-flex items-center justify-center gap-1 px-2 py-1 text-xs font-medium rounded-sm bg-gray-100 text-gray-800 mb-2"
            role="region"
            aria-label={`Location: ${barangay}`}
          >
            <MapPin size={12} aria-hidden={true} />
            {barangay}
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {mapsUrl && (
              <a
                aria-label={`View ${name} on maps in a new tab`}
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-700"
              >
                View on Maps
              </a>
            )}
            {contact && (
              <div className="text-xs text-gray-700">
                <a
                  href={`tel:${contact}`}
                  aria-label={`Call ${name} at ${contact}`}
                >
                  {contact}
                </a>
              </div>
            )}
            {socialUrl && (
              <a
                href={socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-700"
                aria-label={`Visit ${name} social media page in a new tab`}
              >
                Social Media
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
