import { IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  qty_units: number;

  @IsNotEmpty()
  rate: number;

  @IsOptional()
  grade: string;

  @IsOptional()
  cutting_length: string;
}

export class CreateOrderDto {

  @IsNotEmpty()
  party_name: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  order_date: string;

  @IsOptional()
  delivery_date: string;

  @IsNotEmpty()
  grade: string;

  @IsNotEmpty()
  transport: string;

  @IsNotEmpty()
  payment: string;

  @IsNotEmpty()
  priority: string;

  @IsOptional()
  remarks: string;

  @IsOptional()
  packing: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}