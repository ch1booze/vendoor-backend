import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Business } from './business.entity';

@Entity('business_owner')
export class BusinessOwner {
  @ApiProperty()
  @PrimaryColumn()
  userId: string;

  @ApiProperty()
  @OneToOne(() => Business, (business) => business.owner)
  business: Business;
}
