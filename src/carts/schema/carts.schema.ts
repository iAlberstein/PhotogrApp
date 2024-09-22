
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/products/schema/products.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], required: true })
  items: Types.ObjectId[];

  @Prop({ default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);