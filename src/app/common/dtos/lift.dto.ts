import { Expose } from 'class-transformer';
export class  LiftConfigDto {
    @Expose() public readonly title: string;
}