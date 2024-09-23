import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop({required: true})
    stock: number;

    @Prop()
    price: number;

}

export const productSchema = SchemaFactory.createForClass(Product)