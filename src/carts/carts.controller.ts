import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreateCartProductDto } from './dto/create-cart-product.dto';

import { ConfigService } from '@nestjs/config';

@Controller('api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService, private config: ConfigService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Post(':id/products')
  addProductToCart(
    @Param('id') cartId: string, 
    @Body() createCartProductDto: CreateCartProductDto
  ) {
    return this.cartsService.addProductToCart(cartId, createCartProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
