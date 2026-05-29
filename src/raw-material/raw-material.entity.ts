import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MaterialItem } from './material-item.entity';

@Entity()
export class RawMaterial {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: true })
  sNo: number;

  @Column('int', { nullable: true })
  purchaseOrderId: number;

  @Column({ nullable: true })
  serialNumber: string;

  @Column()
  supplier: string;

  @Column()
  purchaseOrderNumber: string;

  @Column()
  truckNumber: string;

  @Column()
  grade: string;

  @Column({ nullable: true })
  colour: string;

  @Column({ nullable: true })
  plant: string;

  @Column({ nullable: true })
  colorCode: string;

  @Column({ nullable: true })
  finalTruckWeight: string;

  @Column('int', { nullable: true })
  numberOfCoils: number;

  @Column()
  unloadingDate: string;

  @Column({ nullable: true })
  orderCompletion: string;

  @Column({ nullable: true })
  orderStatus: string;

  @OneToMany(() => MaterialItem, item => item.rawMaterial, { cascade: true })
  materials: MaterialItem[];
}
