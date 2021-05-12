import {Body, Controller, Get, Post} from '@nestjs/common';
import UserEntity from "./user.entity";
import {UserService} from "./user.service";
import {LoginDtos} from "./user.dtos";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get("/fetchUser")
    fetchUser(): UserEntity {
        return this.userService.fetchUser();
    }

    @Post("/login")
    login(@Body() body: LoginDtos): UserEntity {
        return this.userService.login(body);
    }

    @Post("/forgotPassword")
    forgotPassword(): UserEntity {
        return this.userService.forgotPassword();
    }

    @Post("/updateUser")
    updateUser(): UserEntity {
        return this.userService.updateUser();
    }

}
