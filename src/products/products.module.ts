import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, productSchema } from './schema/products.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Product.name,
    schema: productSchema,
  }]), ConfigModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
