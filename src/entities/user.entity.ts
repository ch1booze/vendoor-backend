import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Business } from './business.entity';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier for the user',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The timestamp when the user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The timestamp when the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: "User's first name", example: 'John' })
  @Column()
  firstName: string;

  @ApiProperty({ description: "User's last name", example: 'Doe' })
  @Column()
  lastName: string;

  @ApiProperty({
    description: "User's unique email address",
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({
    type: () => [Business],
    description: 'List of businesses owned by the user',
  })
  @OneToMany(() => Business, (business) => business.user)
  business: Business[];
}
