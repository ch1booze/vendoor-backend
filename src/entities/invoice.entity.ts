import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Business } from './business.entity';
import { InvoiceItem } from './invoice-item.entity';
import { Payment } from './payment.entity';

@Entity('invoices')
export class Invoice {
  @ApiProperty({ description: 'The unique identifier for the invoice' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Status of the invoice (e.g., "draft", "sent", "paid")',
    example: 'paid',
  })
  @Column()
  status: string;

  @ManyToOne(() => Business, (business) => business.invoices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @ApiProperty()
  @Column({ type: 'uuid' })
  businessId: string;

  @ApiProperty({ type: () => Payment, required: false })
  @OneToOne(() => Payment, (payment) => payment.invoice, { nullable: true })
  payment?: Payment;

  @ApiProperty({ type: () => [InvoiceItem] })
  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];
}
