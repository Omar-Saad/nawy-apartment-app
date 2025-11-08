'use client';

import AddApartmentForm from './AddApartmentForm';

export default function AddApartmentPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Add New Apartment</h1>
      <AddApartmentForm />
    </main>
  );
}
