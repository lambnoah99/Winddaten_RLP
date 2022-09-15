export interface Windpark {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export interface WindparkDetails {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    performance: number;
    amount: number;
    constructionYear?: Number;
    type?: string;
    place?: string;
    district?: string;
    notes?: string
}