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
import { InvoiceItem } from './invoice-item.entity';

@Entity('products')
export class Product {
  @ApiProperty({ description: 'The unique identifier for the product' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ example: 'Super Widget' })
  @Column()
  name: string;

  @ApiProperty({ required: false, example: 'The best widget you can buy.' })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    description:
      'Price of the product as a string to handle various currency formats.',
    example: '19.99',
  })
  @Column()
  price: string;

  @ApiProperty({ example: 'piece' })
  @Column()
  unit: string;

  @ApiProperty({ example: 'Electronics' })
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

  @ApiProperty({
    description: 'The ID of the business this product belongs to',
  })
  @Column({ type: 'uuid' })
  businessId: string;

  @OneToMany(() => InvoiceItem, (item) => item.product)
  invoiceItems: InvoiceItem[];
}
