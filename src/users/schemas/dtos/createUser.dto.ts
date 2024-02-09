import { Prop } from "@nestjs/mongoose"
import { IsEmail, IsString } from "class-validator"


export class CreateUserDto {
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