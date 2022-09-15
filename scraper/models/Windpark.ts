import { DDCoordinates } from "./DDCoordinates";

export interface Windpark {
    name: string;
    performance: number;
    amount: number;
    coordinates: DDCoordinates;
    constructionYear?: Number;
    type?: string;
    place?: string;
    district?: string;
    notes?: string
}