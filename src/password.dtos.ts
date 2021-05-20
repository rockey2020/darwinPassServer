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
    Validate, ArrayMinSize, IsUrl
} from 'class-validator';

export class BatchCreatePasswordDtos {
    @ArrayMinSize(1)
    readonly list: object[];
}

export class UpdatePasswordDtos {
    @IsNumber()
    readonly id: number

    @IsString()
    @Matches(/(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/, {message: "url格式不正确"})
    readonly url: string

    @IsString()
    readonly notes: string

    @IsString()
    readonly title: string

    @IsString()
    readonly username: string

    @IsString()
    readonly password: string
}

export class BatchDeletePasswordDtos {
    @ArrayMinSize(1)
    readonly ids: number[];
}
