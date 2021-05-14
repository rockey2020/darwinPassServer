import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from './http-exception.filter';
import {TransformInterceptor} from "./transform.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 全局注册错误的过滤器
    app.useGlobalFilters(new HttpExceptionFilter());
    // 全局注册成功的过滤器
    app.useGlobalInterceptors(new TransformInterceptor());
    // 全局使用管道
    app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: true, whitelist: true}));
    await app.listen(48480);
}

bootstrap();
