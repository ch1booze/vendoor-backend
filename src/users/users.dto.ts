import { z } from 'zod';

export const signinupUserSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: 'Email must be a string.',
      })
      .email({ message: 'Invalid email address.' })
      .optional(),
    phoneNumber: z
      .string({
        invalid_type_error: 'Phone number must be a string.',
      })
      .regex(/^\d+$/, { message: 'Phone number must contain only numbers.' })
      .optional(),
  })
  .refine((data) => !!data.email || !!data.phoneNumber, {
    message: 'Either email or phone number must be provided.',
  });

export type SigninupUserDto = z.infer<typeof signinupUserSchema>;

export const verifyUserSchema = z.object({
  preAuthSessionId: z.string(),
  deviceId: z.string(),
  userInputCode: z
    .string()
    .regex(/^\d+$/, { message: 'OTP code must contain only numbers' }),
});

export type VerifyUserDto = z.infer<typeof verifyUserSchema>;

export const updateUserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
  })
  .refine((data) => !!data.firstName || !!data.lastName, {
    message: 'Either firstName or lastName must be provided.',
  });

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
