import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const statusCode =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception.message ? exception.message : `${statusCode >= 500 ? 'Service Error' : 'Client Error'}`;
        const errorResponse = {
            statusCode,
            data:  null,
            message,
            errorCode: 1, // 自定义code
            url: request.originalUrl, // 错误的url地址
        };
        // 设置返回的状态码、请求头、发送错误信息
        response.status(statusCode);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
}
