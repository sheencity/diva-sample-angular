import { Expose } from 'class-transformer';
export class  SeasonConfigDto {
    @Expose() public readonly title: string;
    @Expose() public readonly value: number;
}

export class  NoonConfigDto {
    @Expose() public readonly title: string;
    @Expose() public readonly value: number;
}