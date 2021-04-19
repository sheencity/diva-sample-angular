import { Expose } from 'class-transformer';
export class  SeasonConfigDto {
    @Expose() public readonly title: string;
    @Expose() public readonly value: number;
    @Expose() public readonly name: string;
}

export class  NoonConfigDto {
    @Expose() public readonly title: string;
    @Expose() public readonly value: number;
    @Expose() public readonly name: string;
}