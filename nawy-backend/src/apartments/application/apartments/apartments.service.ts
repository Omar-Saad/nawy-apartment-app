import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateApartmentDto } from 'src/apartments/dtos/request-dtos/create-apartment-request.dto';
import { ApartmentResponseDto } from 'src/apartments/dtos/response-dtos/apartment-response.dto';
import { ApartmentEntity } from 'src/apartments/domain/entities/apartment.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { PaginatedResponseDto } from 'src/apartments/dtos/response-dtos/paginated-response.dto';
import { ApartmentFilterQueryDto } from 'src/apartments/dtos/request-dtos/apartment-filter-query.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(ApartmentEntity)
    private readonly apartmentRepo: Repository<ApartmentEntity>,
  ) {}

  async getAll(
    query: ApartmentFilterQueryDto,
  ): Promise<PaginatedResponseDto<ApartmentResponseDto>> {
    const where: FindOptionsWhere<ApartmentEntity> = {};

    if (query?.name) {
      where.name = ILike(`%${query.name}%`);
    }

    if (query?.unitNumber) {
      where.unitNumber = ILike(`%${query.unitNumber}%`);
    }

    if (query?.projectName) {
      where.projectName = ILike(`%${query.projectName}%`);
    }

    const [apartments, total] = await this.apartmentRepo.findAndCount({
      where,
      skip: (query.pageNumber - 1) * query.pageSize,
      take: query.pageSize,
    });

    const data = plainToInstance(ApartmentResponseDto, apartments, {
      excludeExtraneousValues: true,
    });

    return new PaginatedResponseDto<ApartmentResponseDto>(data, total);
  }

  async getById(id: number): Promise<ApartmentResponseDto> {
    const apartment = await this.apartmentRepo.findOneBy({ id });
    if (!apartment) {
      throw new NotFoundException(`Apartment with id ${id} not found`);
    }
    return plainToInstance(ApartmentResponseDto, apartment, {
      excludeExtraneousValues: true,
    });
  }

  async create(dto: CreateApartmentDto): Promise<number> {
    const newApartment = this.apartmentRepo.create(dto);
    const saved = await this.apartmentRepo.save(newApartment);
    return saved.id;
  }
}
