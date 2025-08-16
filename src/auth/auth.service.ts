import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessOwner } from 'src/entities/business-owner.entity';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import {
  LoginBusinessOwnerBody,
  OnboardCustomerBody,
  SignupBusinessOwnerBody,
  VerifyBusinessOwnerBody,
  VerifyCustomerBody,
} from './auth.types';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(BusinessOwner)
    private readonly businessOwnerRepository: Repository<BusinessOwner>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken() {}

  async generateAndSendOtp() {}

  async signupBusinessOwner(body: SignupBusinessOwnerBody) {
    const { email, password, firstName, lastName } = body;

    const existingBusinessOwner = await this.businessOwnerRepository.findOneBy({
      email,
    });
    if (existingBusinessOwner) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await argon2.hash(password);
    const newBusinessOwner = this.businessOwnerRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await this.businessOwnerRepository.save(newBusinessOwner);
  }

  async loginBusinessOwner(body: LoginBusinessOwnerBody) {
    const { email, password } = body;

    const businessOwner = await this.businessOwnerRepository.findOneBy({
      email,
    });
    if (!businessOwner) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordMatch = await argon2.verify(
      businessOwner.password,
      password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { sub: businessOwner.id, email: businessOwner.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    return { accessToken };
  }

  async verifyBusinessOwner(body: VerifyBusinessOwnerBody) {
    const { email, otp } = body;

    const businessOwner = await this.businessOwnerRepository.findOneBy({
      email,
    });
    if (!businessOwner) {
      throw new UnauthorizedException('User not found.');
    }

    if (otp !== businessOwner.otp) {
      throw new UnauthorizedException('Invalid credentials');
    }

    businessOwner.isVerified = true;
    await this.businessOwnerRepository.save(businessOwner);
  }

  async onboardCustomer(body: OnboardCustomerBody) {
    const { identifier, platform } = body;

    const customer = this.customerRepository.create({
      identifier,
      platform,
    });
    await this.customerRepository.save(customer);

    const payload = { sub: customer.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    return { accessToken };
  }

  async verifyCustomer(body: VerifyCustomerBody) {
    const { identifier, otp } = body;

    const customer = await this.customerRepository.findOneBy({ identifier });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (otp !== customer.otp) {
      throw new UnauthorizedException('Invalid credentials');
    }

    customer.isVerified = true;
    await this.customerRepository.save(customer);
  }
}
