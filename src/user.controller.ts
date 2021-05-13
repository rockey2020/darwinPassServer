import {Body, Controller, Get, Post, UseGuards, Query} from '@nestjs/common';
import {UserService} from "./user.service";
import {FetchUserDtos, LoginDtos, RegisterDtos} from "./user.dtos";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("/fetchUser")
    fetchUser(@Query() query: FetchUserDtos) {
        return this.userService.fetchUser(Number(query.id));
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

    @UseGuards(JwtAuthGuard)
    @Post("/updateUser")
    updateUser() {
        return this.userService.updateUser();
    }

}
