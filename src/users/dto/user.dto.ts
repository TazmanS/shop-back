import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { NOT_EMAIL, PASSWORD_LENGTH } from 'src/consts/errors';

export class CreateUserDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'User email' })
  @IsEmail({}, { message: NOT_EMAIL })
  email: string;

  @ApiProperty({ example: 'Password123', description: 'User password' })
  @IsString()
  @Length(6, 16, { message: PASSWORD_LENGTH })
  password: string;

  @ApiProperty()
  @IsString()
  @Length(6, 16)
  name?: string;

  @ApiProperty()
  @IsString()
  @Length(6, 16)
  login?: string;

  @ApiProperty()
  @IsEnum(Role)
  role?: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
