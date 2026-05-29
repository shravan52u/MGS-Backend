import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { OrdersModule } from './orders/orders.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { SupplierModule } from './Supplier/supplier.module';
import { RawMaterialModule } from './raw-material/raw-material.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'testdb',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    OrdersModule,
    PurchaseOrdersModule,
    SupplierModule,
    RawMaterialModule,
    InventoryModule,
  ],
})
export class AppModule {}
