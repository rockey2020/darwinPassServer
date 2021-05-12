import { Injectable } from '@nestjs/common';
import UserEntity from "./user.entity";

@Injectable()
export class UserService {
  fetchUser(): UserEntity {
    return new UserEntity();
  }
  login(body): UserEntity {
    console.log(body)
    return new UserEntity();
  }
  forgotPassword(): UserEntity {
    return new UserEntity();
  }
  updateUser(): UserEntity {
    return new UserEntity();
  }
}
