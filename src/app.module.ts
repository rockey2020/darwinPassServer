import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/User";
import {Password} from "./entities/Password";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {CaptchaController} from "./captcha.controller";
import {CaptchaService} from "./captcha.service";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'darwinPassDatabase',
            entities: [User, Password],
            synchronize: false,//同步表
            entityPrefix: "darwinPass_"//表统一前缀
        }),
        TypeOrmModule.forFeature([User, Password]),
        JwtModule.register({
            secret: "!hGfQmpTfLI#7R!f9UOnD7H&jR5XTB9U27Xw@8uA",
            signOptions: {expiresIn: '7d'},
        }),
    ],
    controllers: [AppController, UserController, CaptchaController],
    providers: [AppService, UserService, JwtStrategy, CaptchaService],
})
export class AppModule {
}
