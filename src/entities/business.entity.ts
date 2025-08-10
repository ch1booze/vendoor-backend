import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { CustomerChat } from './customer-chat.entity';
import { BusinessChat } from './business-chat.entity';

@Entity('businesses')
export class Business {
  @ApiProperty({ description: 'The unique identifier for the business' })
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

  @ApiProperty({ description: 'Name of the business', example: 'ACME Corp' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Tags associated with the business',
    example: ['tech', 'saas'],
  })
  @Column({ type: 'text', array: true, default: '{}' })
  tags: string[];

  @ApiProperty({
    description: 'A detailed description of the business',
    required: false,
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Arbitrary JSON data associated with the business',
    required: false,
  })
  @Column({ type: 'jsonb', nullable: true })
  data?: any;

  @ApiProperty({
    type: () => User,
    description: 'The user who owns this business',
  })
  @ManyToOne(() => User, (user) => user.business, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

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
}
