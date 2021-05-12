import {Controller, Get, Post} from '@nestjs/common';
import UserEntity from "./user.entity";
import {UserService} from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get("/fetchUser")
    fetchUser(): UserEntity {
        return this.userService.fetchUser();
    }

    @Post("/login")
    login(): UserEntity {
        return this.userService.login();
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
