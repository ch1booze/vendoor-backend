import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerChat } from './customer-chat.entity';
import { Order } from './order.entity';

@Entity('customers')
export class Customer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The timestamp when the business was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the business was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Contact info (e.g., phone number, email)',
    example: '+15551234567',
  })
  @Column({ unique: true })
  identifier: string;

  @ApiProperty({
    description: 'Platform the customer came from',
    example: 'whatsapp',
  })
  @Column()
  platform: string;

  @Column({ nullable: true })
  otp?: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => CustomerChat, (chat) => chat.customer)
  customerChats: CustomerChat[];
}
