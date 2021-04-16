import { Expose } from 'class-transformer';
export class  WeatherConfigDto {
    @Expose() public readonly title?: string;
}