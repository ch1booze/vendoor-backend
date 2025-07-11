import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from './customer.entity';
import { Business } from './business.entity';

@Entity('customer_chats')
export class CustomerChat {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: 'What is the price of the Super Widget?' })
  @Column({ type: 'text' })
  query: string;

  @ApiProperty({ example: 'The Super Widget costs $19.99.' })
  @Column({ type: 'text' })
  reply: string;

  @ManyToOne(() => Customer, (customer) => customer.customerChats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ApiProperty()
  @Column({ type: 'uuid' })
  customerId: string;

  @ManyToOne(() => Business, (business) => business.customerChats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @ApiProperty()
  @Column({ type: 'uuid' })
  businessId: string;
}
