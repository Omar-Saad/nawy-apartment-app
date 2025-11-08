import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApartmentResponseDto {
  @ApiProperty({ example: 1, description: 'Apartment ID' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Sunset View', description: 'Apartment name' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'A12', description: 'Unit number' })
  @Expose()
  unitNumber: string;

  @ApiProperty({ example: 'Sunrise Towers', description: 'Project name' })
  @Expose()
  projectName: string;

  @ApiProperty({ example: 1200, description: 'Price per month' })
  @Expose()
  price: number;

  @ApiPropertyOptional({
    example: 'Beautiful apartment with sea view',
    description: 'Optional description',
  })
  @Expose()
  description?: string;

  @ApiPropertyOptional({ example: 3, description: 'Optional floor number' })
  @Expose()
  floorNumber?: number;

  @ApiProperty({ example: 2, description: 'Number of bedrooms' })
  @Expose()
  numBedrooms: number;

  @ApiProperty({ example: 2, description: 'Number of bathrooms' })
  @Expose()
  numBathrooms: number;

  @ApiProperty({ example: 100, description: 'Size in square meters' })
  @Expose()
  sizeSqm: number;

  @ApiProperty({
    example: '123 Main St, Cairo, Egypt',
    description: 'Full address',
  })
  @Expose()
  address: string;

  @ApiPropertyOptional({
    example: ['/uploads/image1.jpg', '/uploads/image2.jpg'],
    description: 'List of image URLs',
  })
  @Expose()
  images?: string[];
}
