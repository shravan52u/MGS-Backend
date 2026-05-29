import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderProduct } from './order-product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: string;

  @Column()
  party_name: string;

  @Column()
  contact: string;

  @Column({ type: 'date' })
  order_date: string;

  @Column({ type: 'date', nullable: true })
  delivery_date: string;

  @Column()
  grade: string;

  @Column()
  transport: string;

  @Column()
  payment: string;

  @Column()
  priority: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ nullable: true })
  packing: string;

  @Column({ default: 'pending' })
status: string;

  @OneToMany(() => OrderProduct, (product) => product.order, { cascade: true })
  products: OrderProduct[];
}