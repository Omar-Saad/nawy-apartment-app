import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('apartments')
export class ApartmentEntity {
  @PrimaryGeneratedColumn({ comment: 'Unique identifier for the apartment' })
  id: number;

  @Column({ comment: 'Name of the apartment/unit' })
  name: string;

  @Column({ comment: 'Unit number of the apartment' })
  unitNumber: string;

  @Column({ comment: 'Name of the project or building' })
  projectName: string;

  @Column('decimal', { comment: 'Price of the apartment' })
  price: number;

  @Column({
    nullable: true,
    comment: 'Optional detailed description of the apartment',
  })
  description?: string;

  @Column('int', {
    nullable: true,
    comment: 'Floor number if applicable (nullable for villas)',
  })
  floorNumber?: number;

  @Column('int', { comment: 'Number of bedrooms in the apartment' })
  numBedrooms: number;

  @Column('int', { comment: 'Number of bathrooms in the apartment' })
  numBathrooms: number;

  @Column('decimal', { comment: 'Size of the apartment in square meters' })
  sizeSqm: number;

  @Column({ comment: 'Full address of the apartment' })
  address: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: 'Timestamp when the apartment record was created',
  })
  createdAt: Date;
}
