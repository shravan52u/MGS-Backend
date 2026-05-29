import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './inventory-item.entity';

type InventoryMaterialInput = {
  size: string;
  coils?: number;
  weight?: number;
  invoice?: number;
  actualWeight?: number;
  actual_weight?: number;
};

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private repo: Repository<InventoryItem>,
  ) {}

  async getAll(query: any) {
    const { size, grade, plant, colour } = query;
    const qb = this.repo.createQueryBuilder('inventory');

    if (size) qb.andWhere('inventory.size = :size', { size });
    if (grade) qb.andWhere('inventory.grade = :grade', { grade });
    if (plant) qb.andWhere('inventory.plant = :plant', { plant });
    if (colour) qb.andWhere('inventory.colour = :colour', { colour });

    const data = await qb.orderBy('inventory.id', 'DESC').getMany();

    return {
      statusCode: 200,
      message: 'Inventory fetched',
      data,
    };
  }

  async addRawMaterials(dto: any) {
    const materials: InventoryMaterialInput[] = dto.materials || [];

    for (const material of materials) {
      if (!material.size) continue;

      const where = {
        size: String(material.size),
        grade: dto.grade || null,
        plant: dto.plant || null,
        colour: dto.colour || null,
      };

      let item = await this.repo.findOne({ where });

      if (!item) {
        item = this.repo.create({
          ...where,
          coils: 0,
          weight: 0,
          invoice: 0,
          actualWeight: 0,
        });
      }

      item.coils += Number(material.coils || 0);
      item.weight += Number(material.weight || 0);
      item.invoice += Number(material.invoice || 0);
      item.actualWeight += Number(
        material.actualWeight || material.actual_weight || material.weight || 0,
      );

      await this.repo.save(item);
    }
  }
}
