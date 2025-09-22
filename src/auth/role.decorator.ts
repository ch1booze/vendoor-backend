import { Reflector } from '@nestjs/core';
import { UserRole } from './auth.types';

export const Role = Reflector.createDecorator<UserRole>();
