// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
// export class PurchaseOrder {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   supplier_name: string;

//   @Column()
//   contact: string;

//   @Column()
//   material: string;

//   @Column('int')
//   quantity: number;

//   @Column('decimal')
//   rate: number;

//   @Column()
//   order_date: string;

//   @Column({ nullable: true })
//   remarks: string;
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ManifestItem } from './manifest-item.entity';

@Entity()
export class PurchaseOrder {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  supplierName: string;

  @Column()
  orderDate: string;

  @Column()
  grade: string;

  @Column({ nullable: true })
  plant: string;

  @Column()
  liftingTime: string;

  @Column('int')
  loadingCharges: number;

  @Column()
  freight: string;

  @Column('int')
  supplyParts: number;

  @Column({ default: 'pending' })
  status: string;

  @OneToMany(() => ManifestItem, item => item.order, { cascade: true })
  manifestItems: ManifestItem[];
}
