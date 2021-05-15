import {Body, Controller, Get, Post, UseGuards, Query, Request} from '@nestjs/common';
import {getCaptchaCodeByEmail} from './captcha.dtos';
import {CaptchaService} from "./captcha.service";

@Controller("captcha")
export class CaptchaController {
    constructor(private readonly captchaService: CaptchaService) {
    }

    @Get("/getCaptchaCodeByEmail")
    async getCaptchaCodeByEmail(@Body() body: getCaptchaCodeByEmail) {
        return this.captchaService.getCaptchaCodeByEmail(body);
    }

}
