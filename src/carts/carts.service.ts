import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument, CartSchema } from './schema/carts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartsService {

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productsService: ProductsService
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

  async addProductToCart(cartId: string, createCartProductDto: CreateCartProductDto) {
    const { productId } = createCartProductDto;
    
    const cart = await this.cartModel.findById(cartId);
    if (!cart) {
      throw new NotFoundException('Carrito no encontrado');
    }

    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    cart.items.push(product._id);
    cart.totalPrice += product.price;

    return await cart.save();
  }
}
