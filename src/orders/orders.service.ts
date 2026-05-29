import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async createOrder(dto: CreateOrderDto) {

    // unique order id generate
    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);

    const order = this.orderRepo.create({
      ...dto,
      order_id: orderId,
    });

    await this.orderRepo.save(order);

    return {
      order_id: orderId,
      message: "Order created",
    };
  }


  async getAllOrders() {
    const orders = await this.orderRepo.find({
      relations: ['products'],  
      order: { id: 'DESC' },    
    });
  
    return {
      message: "Orders fetched successfully",
      data: orders,
    };
  }


async updateOrder(id: number, dto: any) {
  const order = await this.orderRepo.findOne({
    where: { id },
    relations: ['products'],
  });

  if (!order) {
    throw new NotFoundException("Order not found");
  }

  // order update
  Object.assign(order, dto);

  await this.orderRepo.save(order);

  return {
    message: "Order updated successfully",
  };
}

async cancelOrder(id: number) {
  const order = await this.orderRepo.findOne({
    where: { id },
  });

  if (!order) {
    throw new NotFoundException("Order not found");
  }

  order.status = 'cancelled';

  await this.orderRepo.save(order);

  return {
    message: "Order cancelled successfully",
  };
}
  
}