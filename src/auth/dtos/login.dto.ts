import { Prop } from "@nestjs/mongoose"
import { IsEmail } from "class-validator"

export class LoginDto {
    @IsEmail()
    email: string
    @Prop({ required: true })
    password: string

}