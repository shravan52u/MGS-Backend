import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from '../inventory/inventory.module';
import { PurchaseOrder } from '../purchase-orders/purchase-order.entity';
import { UsersModule } from '../users/users.module';
import { MaterialItem } from './material-item.entity';
import { RawMaterialController } from './raw-material.controller';
import { RawMaterial } from './raw-material.entity';
import { RawMaterialService } from './raw-material.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RawMaterial, MaterialItem, PurchaseOrder]),
    InventoryModule,
    UsersModule,
  ],
  controllers: [RawMaterialController],
  providers: [RawMaterialService],
})
export class RawMaterialModule {}
