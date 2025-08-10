import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';

@Entity('payments')
export class Payment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ example: '19.99' })
  @Column()
  amount: string;

  @ApiProperty()
  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @ApiProperty({ example: 'Credit Card' })
  @Column()
  method: string;

  @ApiProperty({ example: 'Payment for INV-001' })
  @Column()
  narration: string;

  @ApiProperty({
    description: 'Binary data for the receipt file (e.g., PDF)',
    type: 'string',
    format: 'binary',
  })
  @Column({ type: 'bytea' })
  receipt: Buffer;

  @ApiProperty({ description: 'JSON object containing sender details' })
  @Column({ type: 'jsonb' })
  sender: any;

  @OneToOne(() => Order, (order) => order.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ApiProperty({
    description: 'The unique ID of the order this payment is for',
  })
  @Column({ type: 'uuid', unique: true })
  orderId: string;
}
