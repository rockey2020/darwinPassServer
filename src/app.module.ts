import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/User";
import {Password} from "./entities/Password";

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
        TypeOrmModule.forFeature([User, Password])
    ],
    controllers: [AppController, UserController],
    providers: [AppService, UserService],
})
export class AppModule {
}
