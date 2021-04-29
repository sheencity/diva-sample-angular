export enum EquipmentState {
    Default = 'default',
    Alarm = 'alarm',
    Translucent = 'translucence',
    Hidden = 'hidden',
}
export class  EquipmentConfigDto {
    public readonly title: string;
    public readonly id: string;
    public readonly state: EquipmentState;
}