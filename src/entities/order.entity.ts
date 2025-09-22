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
import { Customer } from './customer.entity';

@Entity('orders')
export class Order {
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

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ApiProperty()
  @Column({ type: 'uuid' })
  customerId: string;

  @ApiProperty({ type: () => Payment, required: false })
  @OneToOne(() => Payment, (payment) => payment.order, { nullable: true })
  payment?: Payment;

  @ApiProperty({ type: () => [OrderItem] })
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
