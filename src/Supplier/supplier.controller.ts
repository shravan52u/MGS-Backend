import { Controller, Post, Get, Body } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './supplier.dto';

@Controller('supplier')
export class SupplierController {

  constructor(private service: SupplierService) {}

  @Post()
  create(@Body() body: CreateSupplierDto) {
    return this.service.create(body);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }
}