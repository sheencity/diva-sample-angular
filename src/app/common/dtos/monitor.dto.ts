import { Expose } from 'class-transformer';
export class  MonitorConfigDto {
    @Expose() public readonly title: string;
}
export class  MonitorEquiConfigDto {
    @Expose() public readonly title: string;
    @Expose() public readonly url: string;
}