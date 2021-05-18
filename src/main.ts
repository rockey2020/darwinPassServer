import {ArgumentMetadata, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from './http-exception.filter';
import {TransformInterceptor} from "./transform.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    // 全局注册错误的过滤器
    app.useGlobalFilters(new HttpExceptionFilter());
    // 全局注册成功的过滤器
    app.useGlobalInterceptors(new TransformInterceptor());

    // 全局使用管道
    class ValidationPipe2 extends ValidationPipe {
        transform(value: any, metadata: ArgumentMetadata): Promise<any> {
            let newValue = {}
            //过滤掉值为null or undefined的属性
            const isFilterMissingProperties = true
            if (isFilterMissingProperties) {
                newValue = Object.fromEntries(Object.entries(value).filter(([key, value]) => value !== null && value !== undefined))
            } else {
                newValue = value
            }
            return super.transform(newValue, metadata);
        }
    }

    app.useGlobalPipes(new ValidationPipe2({
        forbidUnknownValues: true,
        whitelist: true,
        stopAtFirstError: true,
        transform: true,
    }));
    await app.listen(48480);
}

bootstrap();
