// import { Module } from '@nestjs/common';
// import { OrdersController } from './orders.controller';
// import { OrdersService } from './orders.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Order } from './order.entity';
// import { OrderProduct } from './order-product.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([Order, OrderProduct])],
//   controllers: [OrdersController],
//   providers: [OrdersService],
// })
// export class OrdersModule {}

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderProduct } from './order-product.entity';
import { UsersModule } from '../users/users.module'; // 👈 add

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderProduct]),
    UsersModule, // 🔥 add this
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}