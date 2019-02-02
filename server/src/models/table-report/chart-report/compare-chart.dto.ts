import { IsString, IsNumber } from "class-validator";

export class CompareChartDTO {
    @IsString()
    originID: string;

    @IsString()
    destinationID: string;

    @IsString()
    startDates: string;

    @IsNumber()
    period: number;

}

