import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, userSchema } from './schema/users.schema';
import { Cart, CartDocument } from 'src/carts/schema/carts.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,  
  ) {}

  async create(createUserDto: CreateUserDto) {

    const newCart = await this.cartModel.create({ items: [], totalPrice: 0 });

    const newUser = new this.userModel({
      ...createUserDto,
      cart: newCart._id,  
    });

    return await newUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec(); 
  }
}
