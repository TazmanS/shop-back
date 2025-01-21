import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { NOT_EMAIL, PASSWORD_LENGTH } from 'src/consts/errors';
import { PaginationDto } from 'src/pagination';

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
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @Length(6, 16)
  @IsOptional()
  login?: string;

  @ApiProperty()
  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class GetAllUsersDto extends PaginationDto {}
