import { Expose } from 'class-transformer';
export class  SceneConfigDto {
    @Expose() public readonly title: string;
    @Expose() public readonly index: number;
}