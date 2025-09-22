import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BusinessOwner } from './business-owner.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { CustomerChat } from './customer-chat.entity';
import { BusinessChat } from './business-chat.entity';
import { Customer } from './customer.entity';

@Entity('business')
export class Business {
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
  name: string;

  @ApiProperty()
  @Column({ type: 'text', array: true, default: '{}' })
  tags: string[];

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column({ type: 'jsonb', nullable: true })
  data?: any;

  @ApiProperty()
  @ManyToOne(() => BusinessOwner, (owner) => owner.business, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: BusinessOwner;

  @Column({ type: 'text' })
  ownerId: string;

  @ApiProperty({ type: () => [Product] })
  @OneToMany(() => Product, (product) => product.business)
  products: Product[];

  @ApiProperty({ type: () => [Order] })
  @OneToMany(() => Order, (order) => order.business)
  orders: Order[];

  @OneToMany(() => BusinessChat, (chat) => chat.business)
  businessChats: BusinessChat[];

  @OneToMany(() => CustomerChat, (chat) => chat.business)
  customerChats: CustomerChat[];

  @ManyToMany(() => Customer, (customer) => customer.businesses)
  customers: Customer[];
}
