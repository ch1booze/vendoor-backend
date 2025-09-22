import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ApiProperty()
  @Column({ type: 'uuid' })
  orderId: string;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.orderItems, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ApiProperty()
  @Column({ type: 'uuid' })
  productId: string;
}
