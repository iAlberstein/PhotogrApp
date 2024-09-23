import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument, CartSchema } from './schema/carts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CartsService {

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>
  ) {}

  create(createCartDto: CreateCartDto) {
    return 'Carrito creado con exito';
  }

  findAll() {
    return this.cartModel.find();
  }

  async findOne(id: string) {
    return await this.cartModel.findById(id);
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return await this.cartModel.findByIdAndUpdate(id, updateCartDto, {new: true});
  }

  async remove(id: string) {
    return await this.cartModel.findByIdAndDelete(id);
  }
}
