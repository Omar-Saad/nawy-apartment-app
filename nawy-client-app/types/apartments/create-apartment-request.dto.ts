
export class CreateApartmentDto {
  name!: string;
  unitNumber!: string;

  projectName!: string;
  price!: number;

  description?: string;

  floorNumber?: number;

  numBedrooms!: number;
  numBathrooms!: number;
  sizeSqm!: number;
  address!: string;
}
