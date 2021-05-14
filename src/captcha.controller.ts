import {Body, Controller, Get, Post, UseGuards, Query, Request} from '@nestjs/common';
import {CaptchaService} from "./captcha.service";

@Controller("captcha")
export class CaptchaController {
    constructor(private readonly captchaService: CaptchaService) {
    }

    @Get("/getCaptchaCode")
    async getCaptchaCode() {
        return this.captchaService.getCaptchaCode();
    }

}
