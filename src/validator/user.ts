import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordDto {
  @IsNotEmpty()
  password: string;
}

export class EmailPasswordDto extends PasswordDto {
  @IsEmail()
  email: string;
}