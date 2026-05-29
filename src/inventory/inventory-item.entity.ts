import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column({ nullable: true })
  grade: string;

  @Column({ nullable: true })
  plant: string;

  @Column({ nullable: true })
  colour: string;

  @Column('int', { default: 0 })
  coils: number;

  @Column('float', { default: 0 })
  weight: number;

  @Column('float', { default: 0 })
  invoice: number;

  @Column('float', { default: 0 })
  actualWeight: number;
}
