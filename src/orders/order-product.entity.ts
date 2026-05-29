import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  qty_units: number;

  @Column('float')
  rate: number;

  @Column({ nullable: true })
  grade: string;

  @Column({ nullable: true })
  cutting_length: string;

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;
}