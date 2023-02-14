import { LedState } from "data/enum/LedState";

export interface ILedStatus{
    power?: string;
    screen?: string;
    mode?: LedState;
}
