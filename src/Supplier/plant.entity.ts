import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Supplier } from './supplier.entity';

@Entity()
export class Plant {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plant_name: string;

  @ManyToOne(() => Supplier, supplier => supplier.plants)
  supplier: Supplier;
}