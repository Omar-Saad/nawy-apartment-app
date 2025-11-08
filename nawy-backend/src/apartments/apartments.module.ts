import { Module } from '@nestjs/common';
import { ApartmentsController } from './controllers/apartments/apartments.controller';
import { ApartmentsService } from './application/apartments/apartments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentEntity } from './domain/entities/apartment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentEntity])],
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
})
export class ApartmentsModule {}
