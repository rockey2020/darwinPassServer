import {
    IsEmail,
    IsOptional,
    IsNumber,
    IsString,
    IsUUID,
    Matches,
    MaxLength,
    MinLength,
    Min,
    Validate
} from 'class-validator';

export class LoginDtos {
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @Matches(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/, {message: "请输入10~20位至少两种类型的字符,仅允许数字、字母,中文和标点符号"})
    readonly password: string;
}


export class RegisterDtos {
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @Matches(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/, {message: "请输入10~20位至少两种类型的字符,仅允许数字、字母,中文和标点符号"})
    readonly password: string;

    @IsString()
    @MaxLength(12)
    @MinLength(3)
    readonly username: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    readonly maxIdleTime: number = 7 * 24 * 60;//单位: 分  多久退出登录  默认七天

    @IsString()
    readonly captchaCode: string;

    @IsString()
    @IsUUID(4)
    readonly captchaId: string;
}


export class ForgotPasswordDtos {
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @Matches(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/, {message: "请输入10~20位至少两种类型的字符,仅允许数字、字母,中文和标点符号"})
    readonly password: string;

    @IsString()
    readonly captchaCode: string;

    @IsString()
    @IsUUID(4)
    readonly captchaId: string;
}


export class UpdateUserDtos {
    @IsString()
    @MaxLength(12)
    @MinLength(3)
    @IsOptional()
    readonly username: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    readonly maxIdleTime: number;
}
