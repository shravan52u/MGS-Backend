import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './supplier.dto';

@Injectable()
export class SupplierService {

  constructor(
    @InjectRepository(Supplier)
    private repo: Repository<Supplier>,
  ) {}

  async create(dto: CreateSupplierDto) {
    if (!dto.name) {
      throw new BadRequestException('Supplier name required');
    }

    const supplier = this.repo.create(dto);
    const saved = await this.repo.save(supplier);

    return {
      statusCode: 201,
      message: "Supplier created",
      data: saved,
    };
  }

  async getAll() {
    const data = await this.repo.find({
      relations: ['plants'],
      order: { id: 'DESC' },
    });

    return {
      statusCode: 200,
      message: "Suppliers fetched",
      data,
    };
  }
}