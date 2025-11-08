import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ApartmentsService } from 'src/apartments/application/apartments/apartments.service';
import { CreateApartmentDto } from '../../dtos/request-dtos/create-apartment-request.dto';
import { ApartmentResponseDto } from '../../dtos/response-dtos/apartment-response.dto';
import { PaginatedResponseDto } from 'src/apartments/dtos/response-dtos/paginated-response.dto';
import { ApartmentFilterQueryDto } from 'src/apartments/dtos/request-dtos/apartment-filter-query.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'node:path';
import { diskStorage } from 'multer';

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
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      // max 5 images
      storage: diskStorage({
        destination: './uploads', // folder to store uploaded files
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiBody({ type: CreateApartmentDto })
  @ApiResponse({
    status: 201,
    description: 'Apartment created successfully. Returns the new apartment ID',
    type: Number,
  })
  async create(
    @Body() dto: CreateApartmentDto,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<number> {
    const imageUrls = images.map((file) => `/uploads/${file.filename}`);
    return await this.apartmentsService.create({ ...dto, images: imageUrls });
  }
}
