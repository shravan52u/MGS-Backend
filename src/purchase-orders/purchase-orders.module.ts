// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { PurchaseOrder } from './purchase-order.entity';
// import { PurchaseOrdersController } from './purchase-orders.controller';
// import { PurchaseOrdersService } from './purchase-orders.service';
// import { UsersModule } from '../users/users.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([PurchaseOrder]),
//     UsersModule, // 🔥 JWT access के लिए
//   ],
//   controllers: [PurchaseOrdersController],
//   providers: [PurchaseOrdersService],
// })
// export class PurchaseOrdersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { ManifestItem } from './manifest-item.entity';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrdersService } from './purchase-orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder, ManifestItem])],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}