import { Card, CardContent } from '@bettergov/kapwa/card';
import { MapPin } from 'lucide-react';
import type { Place } from '../../data/tourismLoader';

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
      className="h-full drop-shadow-sm hover:border-primary-200 transition-colors duration-200"
    >
      <CardContent className="p-0!">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-t-md"
          />
        )}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-sm mb-2 mr-2 ${categoryColor ?? 'bg-primary-100 text-primary-700'}`}
          >
            {category}
          </span>
          <span className="inline-flex items-center justify-center gap-1 px-2 py-1 text-xs font-medium rounded-sm bg-gray-100 text-gray-800 mb-2">
            <MapPin size={12} />
            {barangay}
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-700"
              >
                View on Maps
              </a>
            )}
            {contact && (
              <span className="text-xs text-gray-600">{contact}</span>
            )}
            {socialUrl && (
              <a
                href={socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-700"
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
