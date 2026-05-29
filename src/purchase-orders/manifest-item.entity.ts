import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';

@Entity()
export class ManifestItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column()
  qty: number;

  @Column()
  rate: number;

  @ManyToOne(() => PurchaseOrder, order => order.manifestItems)
  order: PurchaseOrder;
}