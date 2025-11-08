import { PaginationQueryDto } from "../pagination-query.dto";

export class ApartmentFilterQueryDto extends PaginationQueryDto {
  name?: string;
  unitNumber?: string;
  projectName?: string;
}
