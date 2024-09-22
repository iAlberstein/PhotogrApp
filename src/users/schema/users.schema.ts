import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Cart } from "src/carts/schema/carts.schema";

export type UserDocument = HydratedDocument<User> & { _id: Types.ObjectId };

@Schema()
export class User {
    @Prop({required: true})
    first_name: string;

    @Prop()
    last_name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop()
    password: string;

    @Prop({ type: Types.ObjectId, ref: 'Cart'})
    cart: Types.ObjectId

    @Prop({
        type: String,
        enum: ['user', 'premium', 'admin'],
        default: 'user'
    })
    role: string;

    @Prop({ type: Date})
    last_connection: Date

}

export const userSchema = SchemaFactory.createForClass(User)