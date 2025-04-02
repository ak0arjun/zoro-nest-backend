import { IsEmail } from 'class-validator';

/**
 * Dto to provide login data
 */
export class LoginDto {
  @IsEmail()
  email: string;
}
