import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { OrdersModule } from './orders/orders.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { SupplierModule } from './Supplier/supplier.module';
import { RawMaterialModule } from './raw-material/raw-material.module';
import { InventoryModule } from './inventory/inventory.module';

const databaseConfig = (): TypeOrmModuleOptions => {
  const commonConfig = {
    type: 'mysql' as const,
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNC !== 'false',
  };

  if (process.env.DATABASE_URL) {
    return {
      ...commonConfig,
      url: process.env.DATABASE_URL,
      ssl:
        process.env.DB_SSL === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    };
  }

  return {
    ...commonConfig,
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
    username: process.env.MYSQLUSER || process.env.DB_USERNAME || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '123456',
    database: process.env.MYSQLDATABASE || process.env.DB_DATABASE || 'testdb',
    entities: [User],
  };
};

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig()),
    UsersModule,
    OrdersModule,
    PurchaseOrdersModule,
    SupplierModule,
    RawMaterialModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
