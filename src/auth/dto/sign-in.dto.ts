import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { NOT_EMAIL, PASSWORD_LENGTH } from 'src/conts/errors';

export class SignInDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'User email' })
  @IsEmail({}, { message: NOT_EMAIL })
  email: string;

  @ApiProperty({ example: 'Password123', description: 'User password' })
  @IsString()
  @Length(6, 16, { message: PASSWORD_LENGTH })
  password: string;
}
