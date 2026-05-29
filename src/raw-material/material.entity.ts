import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RawMaterial } from './raw-material.entity';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column()
  coils: number;

  @Column('float')
  weight: number;

  @Column('float')
  invoice: number;

  @Column('float', { nullable: true })
  approx_coil_weight: number;

  @Column('float', { nullable: true })
  actual_weight: number;

  @ManyToOne(() => RawMaterial, (rm) => rm.materials)
  rawMaterial: RawMaterial;
}
