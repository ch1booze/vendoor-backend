import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/environment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessOwner } from 'src/entities/business-owner.entity';
import { Customer } from 'src/entities/customer.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([BusinessOwner, Customer]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
