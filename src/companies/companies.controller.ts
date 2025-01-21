import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import {
  CreateCompanyDto,
  GetAllCompaniesDto,
  UpdateCompanyDto,
} from './dto/company.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesDecorator } from 'src/auth/guard/roles';
import { Roles } from '@prisma/client';

@Controller('companies')
@ApiTags('Companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.MANAGER)
  @ApiOperation({ summary: 'Create company' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  findAll(@Body() getAllCompaniesDto: GetAllCompaniesDto) {
    return this.companiesService.findAll(getAllCompaniesDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one company' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.MANAGER)
  @ApiOperation({ summary: 'Update company' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.MANAGER)
  @ApiOperation({ summary: 'Delete company' })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
