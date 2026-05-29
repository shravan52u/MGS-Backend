import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryService } from '../inventory/inventory.service';
import { PurchaseOrder } from '../purchase-orders/purchase-order.entity';
import { CreateRawMaterialDto } from './raw-material.dto';
import { RawMaterial } from './raw-material.entity';

@Injectable()
export class RawMaterialService {
  constructor(
    @InjectRepository(RawMaterial)
    private repo: Repository<RawMaterial>,
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepo: Repository<PurchaseOrder>,
    private inventoryService: InventoryService,
  ) {}

  async getAll(query: any) {
    const { page = 1, limit = 10, supplier, grade, from_date, to_date } = query;

    const qb = this.repo.createQueryBuilder('rm');

    if (supplier) qb.andWhere('rm.supplier = :supplier', { supplier });
    if (grade) qb.andWhere('rm.grade = :grade', { grade });

    if (from_date && to_date) {
      qb.andWhere('rm.unloadingDate BETWEEN :from AND :to', {
        from: from_date,
        to: to_date,
      });
    }

    qb.leftJoinAndSelect('rm.materials', 'materials');
    qb.skip((Number(page) - 1) * Number(limit)).take(Number(limit));

    const [data, total] = await qb.getManyAndCount();

    return {
      statusCode: 200,
      message: 'Raw material list fetched',
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    };
  }

  async getOne(id: number) {
    const data = await this.repo.findOne({
      where: { id },
      relations: ['materials'],
    });

    if (!data) throw new NotFoundException('Entry not found');

    return {
      statusCode: 200,
      message: 'Entry fetched',
      data,
    };
  }

  async getGradeSizeMap() {
    const rawMaterials = await this.repo.find({
      relations: ['materials'],
    });

    const gradeMap = new Map<
      string,
      {
        grade: string;
        sizes: Map<
          string,
          {
            size: string;
            totalCoils: number;
            totalWeight: number;
            totalInvoiceWeight: number;
            totalActualWeight: number;
          }
        >;
      }
    >();

    for (const rawMaterial of rawMaterials) {
      const grade = rawMaterial.grade || 'Unknown';

      let gradeEntry = gradeMap.get(grade);

      if (!gradeEntry) {
        gradeEntry = {
          grade,
          sizes: new Map(),
        };
        gradeMap.set(grade, gradeEntry);
      }

      for (const material of rawMaterial.materials || []) {
        const size = material.size || 'Unknown';

        let sizeEntry = gradeEntry.sizes.get(size);

        if (!sizeEntry) {
          sizeEntry = {
            size,
            totalCoils: 0,
            totalWeight: 0,
            totalInvoiceWeight: 0,
            totalActualWeight: 0,
          };
          gradeEntry.sizes.set(size, sizeEntry);
        }

        sizeEntry.totalCoils += Number(material.coils || 0);
        sizeEntry.totalWeight += Number(material.weight || 0);
        sizeEntry.totalInvoiceWeight += Number(
          material.invoiceWeight || material.invoice || 0,
        );
        sizeEntry.totalActualWeight += Number(
          material.actualWeight || material.weight || 0,
        );
      }
    }

    const data = Array.from(gradeMap.values()).map((gradeEntry) => ({
      grade: gradeEntry.grade,
      sizes: Array.from(gradeEntry.sizes.values()),
    }));

    return {
      statusCode: 200,
      message: 'Grade size map fetched',
      data,
    };
  }

  async create(dto: CreateRawMaterialDto) {
    const supplier = dto.supplier || dto.supplierName;
    const materials =
      dto.materials && dto.materials.length > 0
        ? dto.materials
        : dto.materialItems && dto.materialItems.length > 0
          ? dto.materialItems
        : dto.size && dto.coils
          ? [
              {
                size: dto.size,
                coils: dto.coils,
                weight: dto.actualWeight || dto.invoiceWeight || 0,
                invoice: dto.invoiceWeight || 0,
                approxCoilWeight: dto.approxCoilWeight,
                invoiceWeight: dto.invoiceWeight,
                actualWeight: dto.actualWeight,
              },
            ]
          : [];

    if (materials.length === 0) {
      throw new BadRequestException('Material items required');
    }

    if (!supplier) {
      throw new BadRequestException('Supplier name required');
    }

    const materialItems = materials.map((item) => ({
      size: item.size,
      coils: item.coils || dto.numberOfCoils || 0,
      weight: item.weight || item.actualWeight || item.invoiceWeight || 0,
      invoice: item.invoice || item.invoiceWeight || 0,
      approxCoilWeight: item.approxCoilWeight,
      invoiceWeight: item.invoiceWeight,
      actualWeight: item.actualWeight,
    }));

    const data = this.repo.create({
      purchaseOrderId: dto.purchaseOrderId,
      sNo: dto.sNo,
      serialNumber: dto.serialNumber,
      supplier,
      purchaseOrderNumber: dto.purchaseOrderNumber,
      truckNumber: dto.truckNumber,
      unloadingDate: dto.unloadingDate,
      plant: dto.plant,
      grade: dto.grade,
      colour: dto.colour || dto.colorCode,
      colorCode: dto.colorCode || dto.colour,
      finalTruckWeight: dto.finalTruckWeight,
      numberOfCoils: dto.numberOfCoils,
      orderCompletion: dto.orderCompletion,
      orderStatus: dto.orderStatus,
      materials: materialItems,
    });
    const saved = await this.repo.save(data);

    await this.inventoryService.addRawMaterials(saved);
    await this.updatePurchaseOrderStatus(saved.purchaseOrderNumber, saved.orderStatus);

    return {
      statusCode: 201,
      message: 'Raw material saved',
      data: { id: saved.id },
    };
  }

  private async updatePurchaseOrderStatus(
    purchaseOrderNumber: string,
    orderStatus?: string,
  ) {
    const normalizedStatus = String(orderStatus || '').trim().toLowerCase();

    if (!['success', 'completed', 'complete'].includes(normalizedStatus)) {
      return;
    }

    await this.purchaseOrderRepo.update(
      { serialNumber: purchaseOrderNumber },
      { status: 'completed' },
    );
  }

  async update(id: number, dto: any) {
    const existing = await this.repo.findOne({ where: { id } });

    if (!existing) throw new NotFoundException('Entry not found');

    await this.repo.update(id, dto);

    return {
      statusCode: 200,
      message: 'Entry updated successfully',
    };
  }

  async delete(id: number) {
    const existing = await this.repo.findOne({ where: { id } });

    if (!existing) throw new NotFoundException('Entry not found');

    await this.repo.delete(id);

    return {
      statusCode: 200,
      message: 'Entry deleted',
    };
  }
}
