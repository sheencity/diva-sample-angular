import { WeatherName } from '@sheencity/diva-sdk';
import { Expose } from 'class-transformer';
export class  WeatherConfigDto {
    @Expose() public readonly title?: string;
    @Expose() public readonly typeName?: WeatherName;
}
