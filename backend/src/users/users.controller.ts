import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json(user);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'User not created',
        error: 'Bad request',
      });
    }
  }

  @Get()
  async findAll(@Res() response, @Query() query) {
    const count = await this.usersService.usersCount();
    const users = await this.usersService.findAll(query);
    return response.status(HttpStatus.OK).json({ users: users, count: count });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.findOne(id);
    return response.status(HttpStatus.OK).json(user);
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return response.status(HttpStatus.OK).json(user);
    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'User not updated',
        error: 'Bad request',
      });
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    await this.usersService.remove(id);
    return response.status(HttpStatus.OK).json({ result: true });
  }
}
