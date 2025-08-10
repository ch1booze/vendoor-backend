import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Business } from './business.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';

@Entity('orders')
export class Order {
  @ApiProperty({ description: 'The unique identifier for the order' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Status of the order (e.g., "draft", "sent", "paid")',
    example: 'paid',
  })
  @Column()
  status: string;

  @ManyToOne(() => Business, (business) => business.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @ApiProperty()
  @Column({ type: 'uuid' })
  businessId: string;

  @ApiProperty({ type: () => Payment, required: false })
  @OneToOne(() => Payment, (payment) => payment.order, { nullable: true })
  payment?: Payment;

  @ApiProperty({ type: () => [OrderItem] })
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
