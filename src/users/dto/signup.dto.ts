import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {

  @IsEmail({}, { message: 'Valid email required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  userType: string;
}