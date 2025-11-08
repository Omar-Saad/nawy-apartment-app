
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ApartmentResponseDto } from '@/types/apartments/apartment-response.dto';
import { PaginatedResponseDto } from '@/types/paginated-response.dto';
import { ApartmentFilterQueryDto } from '@/types/apartments/apartment-filter-query.dto';
import { getApartments } from '@/lib/api/apartment';
import ApartmentCard from './components/ApartmentCard';
import Spinner from './shared/components/Spinner';
import { useRouter } from 'next/navigation';

export default function ApartmentsPage() {
 const router = useRouter();

  const [apartments, setApartments] = useState<ApartmentResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<ApartmentFilterQueryDto>({
    pageNumber: 1,
    pageSize: 6,
  });
  const [totalPages, setTotalPages] = useState(1);

  // Search / filter states
  const [search, setSearch] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [unitFilter, setUnitFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fetchApartments = useCallback(async () => {
    setLoading(true);
    try {
      // Build filter object: if generic search provided, apply it to all searchable fields
      const filters: Partial<ApartmentFilterQueryDto> = {
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
      };

      if (search.trim()) {
        // apply generic search to all filterable params
        filters.name = search.trim();
        filters.unitNumber = search.trim();
        filters.projectName = search.trim();
      } else {
        if (nameFilter.trim()) filters.name = nameFilter.trim();
        if (unitFilter.trim()) filters.unitNumber = unitFilter.trim();
        if (projectFilter.trim()) filters.projectName = projectFilter.trim();
      }

      const data: PaginatedResponseDto<ApartmentResponseDto> = await getApartments(filters as any);
      setApartments(data.data);
      setTotalPages(Math.max(1, Math.ceil(data.total / (query.pageSize || 10))));
    } catch (err) {
      console.error('Failed to fetch apartments', err);
    } finally {
      setLoading(false);
    }
  }, [query.pageNumber, query.pageSize, search, nameFilter, unitFilter, projectFilter]);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  // Pagination handlers
  const handlePrev = () => {
    if (query.pageNumber > 1) setQuery((q) => ({ ...q, pageNumber: q.pageNumber - 1 }));
  };
  const handleNext = () => {
    if (query.pageNumber < totalPages) setQuery((q) => ({ ...q, pageNumber: q.pageNumber + 1 }));
  };

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Apartments</h1>
            <p className="text-sm text-slate-500 mt-1">Browse listings — modern, responsive and fast.</p>
          </div>

          <div className="w-full md:w-auto flex flex-col md:flex-row gap-3 items-stretch">
            <div className="flex items-center gap-2 w-full md:w-96">
              <input
                aria-label="Search all fields"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setQuery((q) => ({ ...q, pageNumber: 1 }));
                }}
                placeholder="Search name, unit or project..."
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={() => {
                  // clear all filters and refetch
                  setSearch('');
                  setNameFilter('');
                  setUnitFilter('');
                  setProjectFilter('');
                  setQuery((q) => ({ ...q, pageNumber: 1 }));
                }}
                className="px-3 py-2 bg-white border rounded-md shadow-sm text-sm"
                title="Clear filters"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAdvanced((s) => !s)}
                className="px-3 py-2 bg-white border rounded-md shadow-sm text-sm"
                title="Toggle advanced filters"
              >
                Advanced
              </button>

              <select
                value={query.pageSize}
                onChange={(e) => setQuery((q) => ({ ...q, pageSize: Number(e.target.value), pageNumber: 1 }))}
                className="px-3 py-2 border rounded-lg bg-white"
              >
                <option value={6}>6 / page</option>
                <option value={12}>12 / page</option>
                <option value={24}>24 / page</option>
              </select>

            <button
            onClick={() => router.push('/apartments/add')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:brightness-105"
            >
            Add apartment
            </button>

            </div>
          </div>
        </div>

        {showAdvanced && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              placeholder="Filter by name"
              value={nameFilter}
              onChange={(e) => {
                setNameFilter(e.target.value);
                setQuery((q) => ({ ...q, pageNumber: 1 }));
              }}
              className="px-3 py-2 border rounded"
            />
            <input
              placeholder="Filter by unit #"
              value={unitFilter}
              onChange={(e) => {
                setUnitFilter(e.target.value);
                setQuery((q) => ({ ...q, pageNumber: 1 }));
              }}
              className="px-3 py-2 border rounded"
            />
            <input
              placeholder="Filter by project"
              value={projectFilter}
              onChange={(e) => {
                setProjectFilter(e.target.value);
                setQuery((q) => ({ ...q, pageNumber: 1 }));
              }}
              className="px-3 py-2 border rounded"
            />
          </div>
        )}
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : apartments.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-600">No apartments found.</p>
          <div className="mt-6">
<button
  onClick={() => router.push('/apartments/add')}
  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:brightness-105"
>
  Add apartment
</button>

          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {apartments.map((apt) => (
              <ApartmentCard key={apt.id} apartment={apt} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {apartments.length} · Page {query.pageNumber} of {totalPages}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={query.pageNumber === 1}
                className="px-3 py-2 bg-white border rounded-md shadow-sm disabled:opacity-50"
              >
                ‹ Prev
              </button>
              <span className="px-3 py-2 text-sm">Page {query.pageNumber} / {totalPages}</span>
              <button
                onClick={handleNext}
                disabled={query.pageNumber === totalPages}
                className="px-3 py-2 bg-white border rounded-md shadow-sm disabled:opacity-50"
              >
                Next ›
              </button>
            </div>
          </div>
        </>
      )}

    </main>
  );
}