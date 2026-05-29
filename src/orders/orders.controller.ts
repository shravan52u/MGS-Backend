import { Controller, Post, Get, Body, HttpCode, HttpStatus,  Put, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/auth.guard';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {

  constructor(private ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateOrderDto) {
    return this.ordersService.createOrder(body);
  }

  @Get()
getAll() {
  return this.ordersService.getAllOrders();
}

@Put(':id')
update(
  @Param('id') id: string,
  @Body() body: any,
) {
  return this.ordersService.updateOrder(Number(id), body);
}


@Patch(':id/cancel')
cancel(@Param('id') id: string) {
  return this.ordersService.cancelOrder(Number(id));
}

}