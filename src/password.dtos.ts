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
    Validate, ArrayMinSize
} from 'class-validator';

export class BatchCreatePasswordDtos {
    @ArrayMinSize(1)
    readonly list: object[];
}
