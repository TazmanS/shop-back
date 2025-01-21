import { Injectable } from '@nestjs/common';
import {
  CreateCompanyDto,
  GetAllCompaniesDto,
  UpdateCompanyDto,
} from './dto/company.dto';
import { PrismaService } from 'src/prisma.service';
import { Company } from '@prisma/client';
import { getPaginationParams } from 'src/pagination';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.prisma.company.create({ data: createCompanyDto });
  }

  async findAll(getAllCompaniesDto: GetAllCompaniesDto): Promise<Company[]> {
    const { skip, take } = getPaginationParams(getAllCompaniesDto);
    return this.prisma.company.findMany({ skip, take });
  }

  async findOne(id: number): Promise<Company> {
    return this.prisma.company.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: number) {
    this.prisma.company.delete({ where: { id } });
  }
}
