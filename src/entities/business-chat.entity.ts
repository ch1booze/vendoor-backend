import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Business } from './business.entity';

@Entity('business_chats')
export class BusinessChat {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: 'What are my total sales for this month?' })
  @Column({ type: 'text' })
  query: string;

  @ApiProperty({ example: 'Your total sales are $1,234.56.' })
  @Column({ type: 'text' })
  reply: string;

  @ManyToOne(() => Business, (business) => business.businessChats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @ApiProperty()
  @Column({ type: 'uuid' })
  businessId: string;
}
