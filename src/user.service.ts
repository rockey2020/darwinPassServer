import { Injectable } from '@nestjs/common';
import UserEntity from "./user.entity";

@Injectable()
export class UserService {
  fetchUser(): UserEntity {
    return new UserEntity();
  }
  login(): UserEntity {
    return new UserEntity();
  }
  forgotPassword(): UserEntity {
    return new UserEntity();
  }
  updateUser(): UserEntity {
    return new UserEntity();
  }
}
