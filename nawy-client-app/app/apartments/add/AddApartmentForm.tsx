'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { createApartment } from '@/lib/api/apartment';
import { CreateApartmentDto } from '@/types/apartments/create-apartment-request.dto';

const initialForm: CreateApartmentDto = {
  name: '',
  unitNumber: '',
  projectName: '',
  price: 0,
  description: '',
  floorNumber: 0,
  numBedrooms: 1,
  numBathrooms: 1,
  sizeSqm: 0,
  address: '',
};

export default function AddApartmentForm() {
  const router = useRouter();

  const [form, setForm] = useState<CreateApartmentDto>(initialForm);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Handle dropzone */
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  /** Remove one image */
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /** Validate inputs */
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.unitNumber.trim()) errs.unitNumber = 'Unit number is required';
    if (!form.projectName.trim()) errs.projectName = 'Project name is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (form.price < 0) errs.price = 'Price must be >= 0';
    if (form.sizeSqm < 0) errs.sizeSqm = 'Size must be >= 0';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setForm(initialForm);
    setImages([]);
    setPreviews([]);
    setErrors({});
  };

  /** Submit form */
  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrors({});
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await createApartment(form, images);
      router.push('/apartments');
    } catch (error) {
      console.error('Failed to create apartment:', error);
      setErrors({ submit: 'Failed to create apartment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto"
      noValidate
    >
      {/* ---------- IMAGE UPLOAD ---------- */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Apartment Images
        </label>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <p className="text-slate-500">
            {isDragActive
              ? 'Drop the images here...'
              : 'Drag & drop or click to upload images'}
          </p>
        </div>

        {previews.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {previews.map((src, i) => (
              <div key={i} className="relative w-28 h-28">
                <Image
                  src={src}
                  alt={`Preview ${i + 1}`}
                  fill
                  className="object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- NAME & UNIT ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          label="Name"
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          error={errors.name}
        />
        <TextField
          label="Unit #"
          value={form.unitNumber}
          onChange={(v) => setForm((f) => ({ ...f, unitNumber: v }))}
          error={errors.unitNumber}
        />
      </div>

      {/* ---------- PROJECT / PRICE / SIZE ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TextField
          label="Project"
          value={form.projectName}
          onChange={(v) => setForm((f) => ({ ...f, projectName: v }))}
          error={errors.projectName}
        />
        <NumberField
          label="Price"
          value={form.price}
          onChange={(v) => setForm((f) => ({ ...f, price: v }))}
          error={errors.price}
        />
        <NumberField
          label="Size (sqm)"
          value={form.sizeSqm}
          onChange={(v) => setForm((f) => ({ ...f, sizeSqm: v }))}
          error={errors.sizeSqm}
        />
      </div>

      {/* ---------- ADDRESS / FLOOR / ROOMS ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <TextField
          label="Address"
          value={form.address}
          onChange={(v) => setForm((f) => ({ ...f, address: v }))}
          error={errors.address}
        />
        <NumberField
          label="Floor #"
          value={form.floorNumber}
          onChange={(v) => setForm((f) => ({ ...f, floorNumber: v }))}
        />
        <NumberField
          label="Bedrooms"
          value={form.numBedrooms}
          onChange={(v) => setForm((f) => ({ ...f, numBedrooms: v }))}
          min={0}
        />
        <NumberField
          label="Bathrooms"
          value={form.numBathrooms}
          onChange={(v) => setForm((f) => ({ ...f, numBathrooms: v }))}
          min={0}
        />
      </div>

      {/* ---------- DESCRIPTION ---------- */}
      <div>
        <label className="text-sm text-slate-600">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          className="w-full px-3 py-2 border rounded mt-1 focus:ring focus:ring-blue-200"
          rows={4}
        />
      </div>

      {/* ---------- ACTION BUTTONS ---------- */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <button
          type="button"
          onClick={resetForm}
          disabled={isSubmitting}
          className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
}

/* -------------------------- REUSABLE FIELDS -------------------------- */
function TextField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded mt-1 focus:ring focus:ring-blue-200"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  error,
  min,
}: {
  label: string;
  value?: number | string;
  onChange: (v: number) => void;
  error?: string;
  min?: number;
}) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      <input
        type="number"
        min={min}
        value={value ?? ''}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border rounded mt-1 focus:ring focus:ring-blue-200"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
