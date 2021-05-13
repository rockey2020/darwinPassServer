import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/User";
import {JwtService} from "@nestjs/jwt";
import {FetchUserDtos} from "./user.dtos";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {
    }

    fetchUser(id: number) {
        return this.usersRepository.findOne({id}).then(user => {
            if (user) {
                delete user.password
                return user
            }
            return null
        });
    }

    validateUser({email, password}: { email: string, password: string }) {
        return this.usersRepository.findOne({email, password}).then(user => {
            if (user) {
                delete user.password
                return user
            }
            return null
        });
    }

    login(body) {
        return this.validateUser(body).then(res => {
            const user = {...res, authorization: ""}
            if (res) {
                user.authorization = this.jwtService.sign(JSON.parse(JSON.stringify(res)))
            }
            return user
        })
    }

    register(body) {
        return this.usersRepository.save(body).then(user => {
            delete user.password
            return user
        });
    }

    forgotPassword() {
        return {};
    }

    updateUser() {
        return {};
    }
}
