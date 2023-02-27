import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  passwordConfirm: string | undefined;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  photo: string;
}
