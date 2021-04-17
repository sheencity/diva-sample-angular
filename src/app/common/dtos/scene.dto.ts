import { Expose } from 'class-transformer';
export class  SceneConfigDto {
    @Expose() public readonly title = '';
    @Expose() public readonly index = 0;
}