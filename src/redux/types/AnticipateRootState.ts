import { EventType } from "./EventType";
import { OptionsType } from "./OptionsType";

export interface AnticipateRootState {
    events: EventType[];
    options: OptionsType;
}