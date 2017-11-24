import { ShiftType } from './shift-type';

export class Schedule {
    year: number;
    month: number;
    userShiftTypeInDay: Map<number, Map<number, ShiftType>>;
}
