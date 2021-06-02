import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Request, Response} from "express";
import ProtobufAdapter from "./adapter/protobuf";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                const response = context.switchToHttp().getResponse<Response>();
                const request = context.switchToHttp().getRequest<Request>();
                const successResponse = {
                    statusCode: response.statusCode ?? 200,
                    data,
                    message: "请求成功",
                    errorCode: 1, // 自定义code
                    url: request.originalUrl,
                };

                return {encryptedData: new ProtobufAdapter({data: successResponse}).make()}
            }),
        );
    }
}
