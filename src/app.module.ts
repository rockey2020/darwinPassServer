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
import {PasswordController} from "./password.controller";
import {PasswordService} from "./password.service";

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
            entityPrefix: "darwinPass_",//表统一前缀
            // synchronize:true
        }),
        TypeOrmModule.forFeature([User, Password]),
        JwtModule.register({
            secret: "!hGfQmpTfLI#7R!f9UOnD7H&jR5XTB9U27Xw@8uA",
            signOptions: {expiresIn: '7d'},
        }),
    ],
    controllers: [AppController, UserController, CaptchaController, PasswordController],
    providers: [AppService, UserService, JwtStrategy, CaptchaService, PasswordService],
})
export class AppModule {
}
