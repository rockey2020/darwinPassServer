import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {Password} from "./entities/Password";

@Injectable()
export class PasswordService {
    constructor(
        @InjectRepository(Password)
        private passwordsRepository: Repository<Password>,
        private jwtService: JwtService
    ) {
    }

    async fetchPasswordList(id: number) {
        return this.passwordsRepository.findAndCount({user: {id}}).then(passwordList => {
            return passwordList[0] || []
        });
    }

    async batchCreatePassword(id: number, body) {
        const {list} = body
        for (let i of list) {
            i.user = id
        }
        return this.passwordsRepository.insert(list).then(list => {
            return null
        });
    }
}
