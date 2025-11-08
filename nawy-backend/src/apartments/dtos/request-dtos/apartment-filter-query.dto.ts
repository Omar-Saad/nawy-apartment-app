import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class ApartmentFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by apartment name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({description: 'Filter by unit number' })
  @IsOptional()
  @IsString()
  unitNumber?: string;

  @ApiPropertyOptional({
    description: 'Filter by project name',
  })
  @IsOptional()
  @IsString()
  projectName?: string;
}
