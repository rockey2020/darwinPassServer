import {Body, Controller, Get, Post, UseGuards, Query, Request, HttpException, HttpStatus} from '@nestjs/common';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {PasswordService} from "./password.service";
import {BatchCreatePasswordDtos} from "./password.dtos";

@Controller("password")
export class PasswordController {
    constructor(private readonly passwordService: PasswordService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("/fetchPasswordList")
    async fetchPasswordList(@Request() req) {
        const id = req.user.id
        return this.passwordService.fetchPasswordList(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/batchCreatePassword")
    async batchCreatePassword(@Request() req, @Body() body: BatchCreatePasswordDtos) {
        const id = req.user.id
        return this.passwordService.batchCreatePassword(id,body);
    }
}
