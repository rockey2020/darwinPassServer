import {IsEmail,IsOptional, IsNumber, IsString, IsUUID, Matches, MaxLength, MinLength} from 'class-validator';

export class getCaptchaCodeByEmail {
    @IsString()
    @IsEmail()
    readonly email: string;
}
