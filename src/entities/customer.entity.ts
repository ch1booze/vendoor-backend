import { Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerChat } from './customer-chat.entity';
import { Order } from './order.entity';
import { Business } from './business.entity';

@Entity('customers')
export class Customer {
  @ApiProperty()
  @PrimaryColumn()
  userId: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => CustomerChat, (chat) => chat.customer)
  customerChats: CustomerChat[];

  @ManyToMany(() => Business, (business) => business.customers)
  businesses: Business[];
}
