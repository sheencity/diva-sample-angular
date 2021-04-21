import { Expose } from 'class-transformer';
export class  LightDec {
    @Expose() public readonly title: string;
    @Expose() public state: boolean;
}