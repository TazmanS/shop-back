import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser({ email, password }: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
