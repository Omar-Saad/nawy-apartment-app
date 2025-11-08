import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number (default 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageNumber: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Items per page (default 10)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize: number = 10;
}
