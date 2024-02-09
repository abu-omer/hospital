import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/User.schema';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import *as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private authModel: Model<User>, private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto): Promise<{ token: string }> {
        const user = await this.authModel.create(registerDto)
        const token = await this.jwtService.sign({ id: user._id })
        return { token }
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto
        const user = await this.authModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException()
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            throw new UnauthorizedException('invalid username or password')
        }
        const token = await this.jwtService.sign({ id: user._id })
        return { token }
    }

    validateToken(token: string) {
        return this.jwtService.verifyAsync(token, {
            secret: 'your-secret-key'
        })
    }
}
