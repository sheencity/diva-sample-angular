import { Expose } from 'class-transformer';
export class  VideoConfigDto {
    @Expose() public readonly title?: string;
    @Expose() public readonly index?: number;
}