import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ description: 'Page number', default: 1 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  page: number = 1;

  @ApiProperty({ description: 'Limit', default: 10 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 10;
}

export const getPaginationParams = (paginationDto: PaginationDto) => {
  const { page, limit } = paginationDto;

  const take = limit > 0 ? limit : 10;
  const skip = (page > 0 ? page - 1 : 0) * take;

  return { skip, take, page, limit };
};
