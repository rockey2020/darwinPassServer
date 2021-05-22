import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/User";
import {JwtService} from "@nestjs/jwt";
import {ForgotPasswordDtos} from "./user.dtos";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {
    }

    async fetchUser(id: number) {
        return this.usersRepository.findOne({id}).then(user => {
            if (user) {
                delete user.password
                return user
            }
            return null
        });
    }

    async validateUser({email, password}: { email: string, password: string }) {
        return this.usersRepository.findOne({email, password}).then(user => {
            if (user) {
                delete user.password
                return user
            }
            return null
        });
    }

    async login(body) {
        return this.validateUser(body).then(res => {
            if (!res) throw new HttpException({message: "邮箱或密码错误"}, HttpStatus.BAD_REQUEST)
            const user = {...res, authorization: ""}
            if (res) {
                user.authorization = this.jwtService.sign(JSON.parse(JSON.stringify(res)))
            }
            return user
        })
    }

    async register(body) {
        return this.usersRepository.save(body).then(user => {
            return null
        }).catch(err => {
            throw new HttpException({message: "该邮箱已存在"}, HttpStatus.BAD_REQUEST)
        });
    }

    async forgotPassword(body: ForgotPasswordDtos) {
        const {email, password} = body
        return this.usersRepository.update({email}, {password}).then(user => {
            if (!user.affected || user.affected === 0) throw new Error('修改密码失败')
            return null
        }).catch(err => {
            throw new HttpException({message: "修改密码失败"}, HttpStatus.BAD_REQUEST)
        });
    }

    async updateUser(id, body) {
        return this.usersRepository.update(id, body).then(user => {
            return null
        }).catch(err => {
            throw new HttpException({message: "修改用户资料失败"}, HttpStatus.BAD_REQUEST)
        });
    }
}
