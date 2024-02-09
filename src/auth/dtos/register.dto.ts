import { Prop } from "@nestjs/mongoose"
import { Category } from "src/users/schemas/User.schema"

export class RegisterDto {
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