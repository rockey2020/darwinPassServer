import {IsEmail, IsString, Matches} from 'class-validator';
export class LoginDtos {
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @Matches(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/,{message:"请输入10~20位至少两种类型的字符,仅允许数字、字母,中文和标点符号"})
    readonly password: string;
}
