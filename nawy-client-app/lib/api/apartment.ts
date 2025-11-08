import api from './axios';
import { ApartmentFilterQueryDto } from '@/types/apartments/apartment-filter-query.dto';
import { ApartmentResponseDto } from '@/types/apartments/apartment-response.dto';
import { CreateApartmentDto } from '@/types/apartments/create-apartment-request.dto';
import { PaginatedResponseDto } from '@/types/paginated-response.dto';

export async function getApartments(
  query?: ApartmentFilterQueryDto
): Promise<PaginatedResponseDto<ApartmentResponseDto>> {
  const params: Record<string, string> = {};

  if (query) {
    if (query.name) params.name = query.name;
    if (query.unitNumber) params.unitNumber = query.unitNumber;
    if (query.projectName) params.projectName = query.projectName;
    params.pageNumber = (query.pageNumber || 1).toString();
    params.pageSize = (query.pageSize || 10).toString();
  }

  const response = await api.get<PaginatedResponseDto<ApartmentResponseDto>>(
    '/apartments',
    { params }
  );

  return response.data;
}

export async function getApartmentById(id: number): Promise<ApartmentResponseDto> {
  const response = await api.get<ApartmentResponseDto>(`/apartments/${id}`);
  return response.data;
}

export async function createApartment(payload: CreateApartmentDto, images: File[] = []) {
  const formData = new FormData();

  // Append each field individually
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });

  // Append images
  images.forEach((file) => formData.append('images', file));

  // Send form data
  await api.post('/apartments', formData);
}

