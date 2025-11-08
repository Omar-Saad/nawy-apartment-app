'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getApartmentById } from '@/lib/api/apartment';
import { ApartmentResponseDto } from '@/types/apartments/apartment-response.dto';

// 🌀 Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ApartmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [apartment, setApartment] = useState<ApartmentResponseDto | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchApartment = async () => {
      try {
        const data = await getApartmentById(parseInt(id as string));
        setApartment(data);
      } catch (err) {
        console.error(err);
        router.push('/apartments');
      }
    };

    fetchApartment();
  }, [id, router]);

  if (!apartment)
    return <div className="text-center py-20">Apartment not found.</div>;

  return (
    <main className="p-6 md:p-10 max-w-5xl mx-auto bg-white rounded-lg shadow-md space-y-6">
      {/* Title Section */}
      <header className="space-y-1 border-b pb-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {apartment.name}
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          {apartment.projectName}
        </p>
      </header>

      {/* 🖼️ Swiper Carousel */}
      {apartment.images && apartment.images.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="rounded-xl shadow-lg"
        >
          {apartment.images.map((imgUrl, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${imgUrl}`}
                alt={`${apartment.name} image ${idx + 1}`}
                className="w-full h-[450px] object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src="https://placehold.co/800x500"
          alt={apartment.name}
          className="w-full h-[450px] object-cover rounded-xl shadow-md"
        />
      )}

      {/* Apartment Info */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
        <div>
          <strong>Unit #:</strong> {apartment.unitNumber}
        </div>
        <div>
          <strong>Floor:</strong> {apartment.floorNumber || '-'}
        </div>
        <div>
          <strong>Bedrooms:</strong> {apartment.numBedrooms}
        </div>
        <div>
          <strong>Bathrooms:</strong> {apartment.numBathrooms}
        </div>
        <div>
          <strong>Size:</strong> {apartment.sizeSqm} sqm
        </div>
        <div>
          <strong>Price:</strong> ${apartment.price}
        </div>
      </section>

      <section>
        <strong>Address:</strong>
        <p>{apartment.address}</p>
      </section>

      {apartment.description && (
        <section>
          <strong>Description:</strong>
          <p>{apartment.description}</p>
        </section>
      )}

      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={() => router.push('/apartments')}
          className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
        >
          Back to listing
        </button>
      </div>
    </main>
  );
}
