import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Business } from './business.entity';
import { OrderItem } from './order-item.entity';

@Entity('products')
export class Product {
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

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column()
  price: string;

  @ApiProperty()
  @Column()
  unit: string;

  @ApiProperty()
  @Column()
  category: string;

  @ApiProperty({ default: true })
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Business, (business) => business.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @ApiProperty()
  @Column({ type: 'uuid' })
  businessId: string;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[];
}
