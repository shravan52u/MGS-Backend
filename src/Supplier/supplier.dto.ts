import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PlantDto {
  @IsNotEmpty()
  plant_name: string;
}

export class CreateSupplierDto {

  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlantDto)
  plants: PlantDto[];
}