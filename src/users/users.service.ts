import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async createUser({ email, password }: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id: +userId },
      data: updateUserDto,
    });
  }
}
