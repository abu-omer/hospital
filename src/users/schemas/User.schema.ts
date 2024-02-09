import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import *as bcrypt from 'bcryptjs'

export enum Category {
    "USER" = 'user',
    "ADMIN" = 'admin',
    "MANAGER" = 'manager'
}

@Schema({
    timestamps: true
})

export class User {
    @Prop({ required: true })
    name: string
    @Prop({ required: true })
    slug: string
    @Prop({ required: true, unique: true })
    email: string
    @Prop({ required: true })
    password: string
    @Prop({ required: true, default: 'user' })
    roles: Category
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre<User>('save', async function (next: Function) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
