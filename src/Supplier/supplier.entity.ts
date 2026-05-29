import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Plant } from './plant.entity';

@Entity()
export class Supplier {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Plant, plant => plant.supplier, { cascade: true })
  plants: Plant[];
}