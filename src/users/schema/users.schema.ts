import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

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

}

export const userSchema = SchemaFactory.createForClass(User)