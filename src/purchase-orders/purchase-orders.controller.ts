// import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
// import { PurchaseOrdersService } from './purchase-orders.service';
// import { AuthGuard } from '../users/auth.guard';

// @UseGuards(AuthGuard)
// @Controller('purchase-orders')
// export class PurchaseOrdersController {

//   constructor(private service: PurchaseOrdersService) {}

//   // ✅ GET /purchase-orders
//   @Get()
//   getAll() {
//     return this.service.getAll();
//   }

//   // ✅ POST /purchase-orders
//   @Post()
//   create(@Body() body: any) {
//     return this.service.create(body);
//   }

//   // ✅ PUT /purchase-orders/:id
//   @Put(':id')
//   update(@Param('id') id: string, @Body() body: any) {
//     return this.service.update(Number(id), body);
//   }
// }

import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto } from './purchase-order.dto';

@Controller('purchase-orders')
export class PurchaseOrdersController {

  constructor(private service: PurchaseOrdersService) {}

  @Post()
  create(@Body() body: CreatePurchaseOrderDto) {
    return this.service.create(body);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get('procurement-summary')
  getProcurementSummary() {
    return this.service.getProcurementSummary();
  }

  @Get('generate-number')
  generatePurchaseOrderNumber() {
    return this.service.generatePurchaseOrderNumber();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(Number(id), body);
  }
}
