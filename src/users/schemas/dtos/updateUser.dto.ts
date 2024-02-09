import { Prop } from "@nestjs/mongoose"
import { IsEmail, IsString } from "class-validator"
import { User, UserSchema } from "../User.schema"
import *as bcrypt from 'bcryptjs'


export class UpdateUserDto {
    @IsString()
    name: string
    @IsString()
    slug: string
    @IsEmail()
    @Prop({ required: true, unique: true })
    email: string
    @IsString()
    password: string
}

