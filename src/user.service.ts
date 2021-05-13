import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/User";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    fetchUser() {
        return {};
    }

    login(body) {
        return this.usersRepository.findOne({email: body.email, password: body.password}).then(user => {
            if (user) {
                delete user.password
                return user
            }
            return null
        });
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
