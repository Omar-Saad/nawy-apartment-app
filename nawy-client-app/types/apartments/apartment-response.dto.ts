export class ApartmentResponseDto {
  readonly id!: number;
  readonly name!: string;
  readonly unitNumber!: string;
  readonly projectName!: string;
  readonly price!: number;
  readonly description?: string;
  readonly floorNumber?: number;
  readonly numBedrooms!: number;
  readonly numBathrooms!: number;
  readonly sizeSqm!: number;
  readonly address!: string;
  readonly images?: string[];
}
