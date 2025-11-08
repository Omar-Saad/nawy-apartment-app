import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty({ example: 'Sunset View', description: 'Apartment name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A12', description: 'Unit number' })
  @IsString()
  @IsNotEmpty()
  unitNumber: string;

  @ApiProperty({ example: 'Sunrise Towers', description: 'Project name' })
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({ example: 1200, description: 'Price per month' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    example: 'Beautiful apartment with sea view',
    description: 'Optional description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 3, description: 'Optional floor number' })
  @IsOptional()
  @IsNumber()
  floorNumber?: number;

  @ApiProperty({ example: 2, description: 'Number of bedrooms' })
  @IsNumber()
  @Min(0)
  numBedrooms: number;

  @ApiProperty({ example: 2, description: 'Number of bathrooms' })
  @IsNumber()
  @Min(0)
  numBathrooms: number;

  @ApiProperty({ example: 100, description: 'Size in square meters' })
  @IsNumber()
  @Min(0)
  sizeSqm: number;

  @ApiProperty({
    example: '123 Main St, Cairo, Egypt',
    description: 'Full address',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({
    example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
    description: 'Optional list of image URLs',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
