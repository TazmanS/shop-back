import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, GetAllUsersDto, UpdateUserDto } from './dto/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UNAUTHORIZED, WRONG_PARAMS } from 'src/consts/errors';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  getAll(@Query() getAllUsersDto: GetAllUsersDto) {
    return this.usersService.getAll(getAllUsersDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get current user' })
  getMe(@Request() req) {
    const user = req.user;
    if (!user) {
      throw new HttpException(UNAUTHORIZED, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update user' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const user = req.user;
    if (+user.id !== +id) {
      throw new HttpException(WRONG_PARAMS, HttpStatus.BAD_REQUEST);
    }
    return this.usersService.update(id, updateUserDto);
  }
}
