import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "!hGfQmpTfLI#7R!f9UOnD7H&jR5XTB9U27Xw@8uA",
        });
    }

    async validate(payload: any) {
        return {id: payload.id, email: payload.email};
    }
}
