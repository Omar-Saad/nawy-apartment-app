import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({
    isArray: true,
    description: 'List of items',
    type: Object, // will be replaced by concrete type in controller
  })
  @Type(() => Object)
  data: T[];

  @ApiProperty({ example: 20, description: 'Total items in database' })
  total: number;

  constructor(data: T[], total: number) {
    this.data = data;
    this.total = total;
  }
}
