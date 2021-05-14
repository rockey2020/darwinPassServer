import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';

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
        // //参数错误
        if (statusCode === 400) {
            const _message = (exception.getResponse() as any).message
            if ((_message instanceof Array) && _message.length !== 0) exception.message = _message[0]
        }
        console.log((exception.getResponse() as any).message)
        const message = exception.message ? exception.message : `${statusCode >= 500 ? 'Service Error' : 'Client Error'}`;
        const errorResponse = {
            statusCode,
            data: null,
            message,
            errorCode: 1, // 自定义code
            url: request.originalUrl,
        };
        // 设置返回的状态码、请求头、发送错误信息
        response.status(statusCode);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
}
