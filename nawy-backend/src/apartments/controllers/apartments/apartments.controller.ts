import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ApartmentsService } from 'src/apartments/application/apartments/apartments.service';
import { CreateApartmentDto } from '../../dtos/request-dtos/create-apartment-request.dto';
import { ApartmentResponseDto } from '../../dtos/response-dtos/apartment-response.dto';
import { PaginatedResponseDto } from 'src/apartments/dtos/response-dtos/paginated-response.dto';
import { ApartmentFilterQueryDto } from 'src/apartments/dtos/request-dtos/apartment-filter-query.dto';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Paginated list of apartments',
    type: PaginatedResponseDto<ApartmentResponseDto>,
  })
  async getAllApartments(
    @Query() query: ApartmentFilterQueryDto,
  ): Promise<PaginatedResponseDto<ApartmentResponseDto>> {
    return await this.apartmentsService.getAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Apartment details',
    type: ApartmentResponseDto,
  })
  async getApartmentById(
    @Param('id') id: number,
  ): Promise<ApartmentResponseDto> {
    return await this.apartmentsService.getById(id);
  }

  @Post()
  @ApiBody({ type: CreateApartmentDto })
  @ApiResponse({
    status: 201,
    description: 'Apartment created successfully. Returns the new apartment ID',
    type: Number,
  })
  async create(@Body() dto: CreateApartmentDto): Promise<number> {
    return await this.apartmentsService.create(dto);
  }
}
