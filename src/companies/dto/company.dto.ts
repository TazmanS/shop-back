import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationDto } from 'src/pagination';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}

export class GetAllCompaniesDto extends PaginationDto {}
