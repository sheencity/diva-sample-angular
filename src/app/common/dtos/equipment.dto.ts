import { Expose } from 'class-transformer';

export enum EquipmentState {
    Default = 'default',
    Alarm = 'alarm',
    Translucent = 'translucence',
    Hidden = 'hidden',
}
export class  EquipmentConfigDto {
    @Expose() public readonly title: string;
    @Expose() public readonly id: string;
    @Expose() public readonly state: EquipmentState;
}