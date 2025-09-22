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

  @ApiProperty()
  @Column({ type: 'text' })
  query: string;

  @ApiProperty()
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
