import { DDCoordinates } from "./DDCoordinates";

export interface Anlage {
    name: string;
    leistung: number;
    anzahl: number;
    koordinaten: DDCoordinates;
}