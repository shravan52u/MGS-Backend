// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { PurchaseOrder } from './purchase-order.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class PurchaseOrdersService {

//   constructor(
//     @InjectRepository(PurchaseOrder)
//     private poRepo: Repository<PurchaseOrder>,
//   ) {}

//   // ✅ GET ALL
//   async getAll() {
//     const data = await this.poRepo.find({
//       order: { id: 'DESC' },
//     });

//     return {
//       message: "Purchase orders fetched",
//       data,
//     };
//   }

//   // ✅ CREATE
//   async create(dto: any) {
//     const po = this.poRepo.create(dto);
//     await this.poRepo.save(po);

//     return {
//       message: "Purchase order created",
//     };
//   }

//   // ✅ UPDATE
//   async update(id: number, dto: any) {
//     await this.poRepo.update(id, dto);

//     return {
//       message: "Purchase order updated",
//     };
//   }
// }

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { CreatePurchaseOrderDto } from './purchase-order.dto';

@Injectable()
export class PurchaseOrdersService {

  constructor(
    @InjectRepository(PurchaseOrder)
    private repo: Repository<PurchaseOrder>,
  ) {}

  async generatePurchaseOrderNumber() {
    const year = new Date().getFullYear();
    const prefix = `PO-${year}-`;
    const orders = await this.repo.find({
      where: { serialNumber: Like(`${prefix}%`) },
      select: ['serialNumber'],
    });

    const usedNumbers = orders
      .map((order) => Number(order.serialNumber?.replace(prefix, '')))
      .filter((value) => Number.isInteger(value) && value > 0);

    let nextNumber = usedNumbers.length > 0 ? Math.max(...usedNumbers) + 1 : 1;
    let purchaseOrderNumber = `${prefix}${String(nextNumber).padStart(3, '0')}`;

    while (await this.repo.findOne({ where: { serialNumber: purchaseOrderNumber } })) {
      nextNumber += 1;
      purchaseOrderNumber = `${prefix}${String(nextNumber).padStart(3, '0')}`;
    }

    return {
      statusCode: 200,
      message: "Purchase order number generated",
      data: {
        purchaseOrderNumber,
      },
    };
  }

  async create(dto: CreatePurchaseOrderDto) {

    console.log("DTO:", dto);  
    if (!dto.manifestItems || dto.manifestItems.length === 0) {
      throw new BadRequestException("Manifest items required");
    }

    const purchaseOrderNumber = dto.purchaseOrderNumber || dto.serialNumber;

    if (!purchaseOrderNumber) {
      throw new BadRequestException("Purchase order number required");
    }

    const existingOrder = await this.repo.findOne({
      where: { serialNumber: purchaseOrderNumber },
    });

    if (existingOrder) {
      throw new BadRequestException("Purchase order number already exists");
    }
  
    const order = this.repo.create({
      serialNumber: purchaseOrderNumber,
      supplierName: dto.supplierName,
      orderDate: dto.orderDate,
      grade: dto.grade,
      plant: dto.plant,
      liftingTime: dto.liftingTime,
      loadingCharges: dto.loadingCharges,
      freight: dto.freight,
      supplyParts: dto.supplyParts,
      status: dto.status || 'pending',
  
      // 🔥 IMPORTANT
      manifestItems: dto.manifestItems,
    });
  
    const saved = await this.repo.save(order);
  
    return {
      statusCode: 201,
      message: "Purchase order created",
      data: { id: saved.id },
    };
  }

  async getAll() {

    const data = await this.repo.find({
      relations: ['manifestItems'],
    });

    return {
      statusCode: 200,
      message: "Purchase orders fetched",
      data,
    };
  }

  async getProcurementSummary() {
    const orders = await this.repo.find({
      relations: ['manifestItems'],
    });

    const summary = orders.reduce(
      (acc, order) => {
        const orderMt = (order.manifestItems || []).reduce(
          (total, item) => total + Number(item.qty || 0),
          0,
        );
        const status = (order.status || 'pending').toLowerCase();

        acc.totalProcurementMt += orderMt;
        if (status === 'completed' || status === 'complete') {
          acc.completedMt += orderMt;
        } else {
          acc.pendingMt += orderMt;
        }

        return acc;
      },
      {
        totalProcurementMt: 0,
        pendingMt: 0,
        completedMt: 0,
        totalOrders: orders.length,
        pendingOrders: 0,
        completedOrders: 0,
      },
    );

    summary.completedOrders = orders.filter((order) => {
      const status = (order.status || 'pending').toLowerCase();
      return status === 'completed' || status === 'complete';
    }).length;
    summary.pendingOrders = summary.totalOrders - summary.completedOrders;

    return {
      statusCode: 200,
      message: "Total procurement fetched",
      data: summary,
    };
  }

  async getOne(id: number) {
    const data = await this.repo.findOne({
      where: { id },
      relations: ['manifestItems'],
    });

    if (!data) {
      throw new NotFoundException("Purchase order not found");
    }

    return {
      statusCode: 200,
      message: "Purchase order fetched",
      data,
    };
  }

  async update(id: number, dto: any) {

    await this.repo.update(id, dto);

    return {
      statusCode: 200,
      message: "Purchase order updated",
    };
  }
}
