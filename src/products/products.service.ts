import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { InjectModel } from '@nestjs/mongoose';

import { Product, ProductDocument, productSchema } from './schema/products.schema';

import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model <ProductDocument>) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, {new: true});
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
