import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerChat } from './customer-chat.entity';
import { Order } from './order.entity';

@Entity('customers')
export class Customer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Contact info (e.g., phone number, email)',
    example: '+15551234567',
  })
  @Column()
  contact: string;

  @ApiProperty({
    description: 'Platform the customer came from',
    example: 'whatsapp',
  })
  @Column()
  platform: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => CustomerChat, (chat) => chat.customer)
  customerChats: CustomerChat[];
}
