import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in' })
  async login(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto);
    if (!user) {
      throw new Error('Invalid credentials, v1');
    }
    return this.authService.login(user);
  }
}
