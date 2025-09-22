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

  @ApiProperty()
  @Column()
  method: string;

  @ApiProperty()
  @Column()
  narration: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @Column({ type: 'bytea' })
  receipt: Buffer;

  @ApiProperty()
  @Column({ type: 'jsonb' })
  sender: any;

  @OneToOne(() => Order, (order) => order.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ApiProperty()
  @Column({ type: 'uuid', unique: true })
  orderId: string;
}
