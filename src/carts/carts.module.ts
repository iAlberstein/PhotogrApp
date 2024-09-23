import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { Cart, CartSchema } from './schema/carts.schema';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ConfigModule,
    ProductsModule
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
