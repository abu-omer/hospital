import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './schemas/dtos/createUser.dto';
import { UpdateUserDto } from './schemas/dtos/updateUser.dto';
import *as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }


    async getUsers(): Promise<User[]> {
        return this.userModel.find()
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email } = createUserDto
        const existingUser = await this.userModel.findOne({ email })
        if (existingUser) {
            throw new HttpException('the email is is user', 400)
        }
        return this.userModel.create(createUserDto)
    }
    async getUser(id: string): Promise<User> {
        return this.userModel.findById(id)
    }
    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        if (updateUserDto.password) {
            const hashPassword = await bcrypt.hash(updateUserDto.password, 10)
            return this.userModel.findByIdAndUpdate(id, { ...updateUserDto, password: hashPassword }, { new: true })

        }
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
    }
    async deleteUser(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id)
    }

}


