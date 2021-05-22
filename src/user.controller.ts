import {Body, Controller, Get, Post, UseGuards, Query, Request, HttpException, HttpStatus} from '@nestjs/common';
import {UserService} from "./user.service";
import {ForgotPasswordDtos, LoginDtos, RegisterDtos, UpdateUserDtos} from "./user.dtos";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {CaptchaService} from "./captcha.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService, private readonly captchaService: CaptchaService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("/fetchUser")
    async fetchUser(@Request() req) {
        const id = req.user.id
        return this.userService.fetchUser(id);
    }

    @Post("/login")
    async login(@Body() body: LoginDtos) {
        return this.userService.login(body);
    }

    @Post("/register")
    async register(@Body() body: RegisterDtos) {
        if (await this.captchaService.validateCaptchaCode(body.captchaId, body.captchaCode)) {
            return this.userService.register(body);
        } else {
            throw new HttpException({message: "验证码错误"}, HttpStatus.BAD_REQUEST);
        }
    }

    @Post("/forgotPassword")
    async forgotPassword(@Body() body: ForgotPasswordDtos) {
        if (await this.captchaService.validateCaptchaCode(body.captchaId, body.captchaCode)) {
            return this.userService.forgotPassword(body);
        } else {
            throw new HttpException({message: "验证码错误"}, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post("/updateUser")
    async updateUser(@Body() body: UpdateUserDtos, @Request() req) {
        const id = req.user.id
        return this.userService.updateUser(id, body);
    }

}
