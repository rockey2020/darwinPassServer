import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {LoginDtos, RegisterDtos} from "./user.dtos";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get("/fetchUser")
    fetchUser() {
        return this.userService.fetchUser();
    }

    @Post("/login")
    login(@Body() body: LoginDtos) {
        return this.userService.login(body);
    }

    @Post("/register")
    register(@Body() body: RegisterDtos) {
        return this.userService.register(body);
    }

    @Post("/forgotPassword")
    forgotPassword() {
        return this.userService.forgotPassword();
    }

    @Post("/updateUser")
    updateUser() {
        return this.userService.updateUser();
    }

}
