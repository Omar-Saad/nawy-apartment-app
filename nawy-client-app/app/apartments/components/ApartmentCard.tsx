import { ApartmentResponseDto } from '@/types/apartments/apartment-response.dto';
import Link from 'next/link';

interface Props {
  apartment: ApartmentResponseDto;
}

export default function ApartmentCard({ apartment }: Props) {
  
const imageUrl = apartment.images?.[0] 
  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${apartment.images[0]}` 
  : 'https://placehold.co/600x400';

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 relative">
      
      {/* Image Section */}
      <div className="relative h-48 sm:h-56">
        <img
          src={imageUrl}
          alt={apartment.name}
          className="w-full h-full object-cover"
        />
        {/* Project Badge */}
        <div className="absolute left-3 top-3 bg-white/90 text-xs px-2 py-1 rounded-md font-medium shadow-sm">
          {apartment.projectName}
        </div>
        {/* Price Badge */}
        <div className="absolute right-3 top-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm px-3 py-1 rounded-md font-semibold shadow">
          ${apartment.price}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{apartment.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Unit {apartment.unitNumber} • {apartment.sizeSqm} sqm
          </p>
        </div>

        {/* Details and View Link */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none">
                <path d="M12 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {apartment.numBedrooms} Beds
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none">
                <path d="M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {apartment.numBathrooms} Baths
            </span>
          </div>


        <Link href={`/apartments/${apartment.id}`}>
        <div className="cursor-pointer">
            <span className="text-blue-600 hover:underline">View Details ›</span>
        </div>
        </Link>
        </div>
      </div>
    </article>
  );
}
