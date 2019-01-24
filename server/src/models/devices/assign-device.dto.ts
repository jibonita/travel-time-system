
import { IsString, Length, IsOptional, IsArray } from 'class-validator';

export class AssignDeviceDTO {
    @IsString()
    @Length(3, 100)
    readonly user: string;

    @IsArray()
    readonly devices: string[];
    

}
