import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/User.schema';
import { CreateUserDto } from './schemas/dtos/createUser.dto';
import { UpdateUserDto } from './schemas/dtos/updateUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminRoleGuard } from 'src/auth/admin-role/admin-role.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers()
    }
    @UseGuards(AuthGuard)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto)
    }
    @UseGuards(AdminRoleGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUser(id)
    }
    @UseGuards(RolesGuard)
    @Roles('admin')
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, updateUserDto)
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser(id)
    }
}
