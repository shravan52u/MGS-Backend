// purchase-order.dto.ts

import { IsNotEmpty, IsString, IsArray, ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ManifestItemDto {   
  @IsString()
  size: string;

  @IsNumber()
  qty: number;

  @IsNumber()
  rate: number;
}

export class CreatePurchaseOrderDto {

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsOptional()
  @IsString()
  purchaseOrderNumber?: string;

  @IsNotEmpty()
  supplierName: string;

  @IsNotEmpty()
  orderDate: string;

  @IsNotEmpty()
  grade: string;

  @IsOptional()
  @IsString()
  plant?: string;

  @IsNotEmpty()
  liftingTime: string;

  @IsNumber()
  loadingCharges: number;

  @IsString()
  freight: string;

  @IsNumber()
  supplyParts: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ManifestItemDto)
  manifestItems: ManifestItemDto[];
}
