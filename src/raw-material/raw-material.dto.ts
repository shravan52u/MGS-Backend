import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MaterialItemDto {
  @IsNotEmpty()
  @IsString()
  size: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  coils?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  weight?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  invoice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  approxCoilWeight?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  invoiceWeight?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  actualWeight?: number;
}

export class CreateRawMaterialDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sNo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  purchaseOrderId?: number;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsNotEmpty()
  @IsString()
  purchaseOrderNumber: string;

  @IsOptional()
  @IsString()
  supplierName?: string;

  @IsOptional()
  @IsString()
  supplier?: string;

  @IsNotEmpty()
  @IsString()
  truckNumber: string;

  @IsNotEmpty()
  @IsString()
  unloadingDate: string;

  @IsNotEmpty()
  @IsString()
  plant: string;

  @IsNotEmpty()
  @IsString()
  grade: string;

  @IsOptional()
  @IsString()
  colour?: string;

  @IsOptional()
  @IsString()
  colorCode?: string;

  @IsOptional()
  @IsString()
  finalTruckWeight?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  numberOfCoils?: number;

  @IsOptional()
  @IsString()
  orderCompletion?: string;

  @IsNotEmpty()
  @IsString()
  orderStatus: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  coils?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  approxCoilWeight?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  invoiceWeight?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  actualWeight?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialItemDto)
  materials?: MaterialItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialItemDto)
  materialItems?: MaterialItemDto[];
}
