import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RawMaterial } from './raw-material.entity';

@Entity()
export class MaterialItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column('int')
  coils: number;

  @Column('int', { nullable: true })
  weight: number;

  @Column('int', { nullable: true })
  invoice: number;

  @Column('int', { nullable: true })
  approxCoilWeight: number;

  @Column('int', { nullable: true })
  invoiceWeight: number;

  @Column('int', { nullable: true })
  actualWeight: number;

  @ManyToOne(() => RawMaterial, rm => rm.materials)
  rawMaterial: RawMaterial;
}
