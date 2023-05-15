import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.id = await this.findLastId();
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll(query) {
    return this.userModel
      .find()
      .limit(query.itemsPerPage || 10)
      .sort({ [query.sort]: query.sortType === 'asc' ? 1 : -1 })
      .exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  async findLastId() {
    const user = await this.userModel.findOne().sort({ id: -1 }).exec();
    if (user) {
      return ++user.id;
    }
    return 1;
  }

  async usersCount() {
    return await this.userModel.count().exec();
  }
}
