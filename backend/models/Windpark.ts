export interface Windpark {
    id: number;
    name: string;
    performance?: number;
    amount?: number;
    latitude: string;
    longitude: string;
    constructionYear?: Number;
    type?: string;
    place?: string;
    district?: string;
    notes?: string
    currentPerformance?: number;
}